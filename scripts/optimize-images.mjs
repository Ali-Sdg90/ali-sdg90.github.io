import { createHash } from "node:crypto";
import {
    access,
    mkdir,
    readFile,
    readdir,
    rename,
    rm,
    writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { presets, rules } from "./image-config.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(scriptPath), "..");
const sourceRoot = path.join(projectRoot, "image-sources");
const outputRoot = path.join(projectRoot, "src", "assets", "images");
const cachePath = path.join(
    projectRoot,
    "node_modules",
    ".cache",
    "portfolio-image-optimizer.json",
);
const cacheVersion = 2;
const supportedExtensions = new Set([".jpeg", ".jpg", ".png", ".svg", ".webp"]);

const thumbnailOptions = {
    fit: "cover",
    position: "centre",
    quality: 82,
};

const normalizePath = (value) => value.split(path.sep).join("/");

const globToRegExp = (pattern) => {
    const normalizedPattern = normalizePath(pattern);
    const escapedPattern = normalizedPattern
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\*\*/g, "\0")
        .replace(/\*/g, "[^/]*")
        .replace(/\?/g, "[^/]")
        .replace(/\0/g, ".*");

    return new RegExp(`^${escapedPattern}$`);
};

const validateConfiguration = () => {
    for (const [name, preset] of Object.entries(presets)) {
        if (
            !Number.isInteger(preset.width) ||
            preset.width <= 0 ||
            !Number.isInteger(preset.height) ||
            preset.height <= 0
        ) {
            throw new Error(
                `Preset "${name}" must have positive integer width and height values.`,
            );
        }
    }

    if (!Array.isArray(rules) || rules.length === 0) {
        throw new Error("At least one image rule must be configured.");
    }

    return rules.map((rule, index) => {
        if (!rule?.match || typeof rule.match !== "string") {
            throw new Error(`Rule ${index + 1} must define a glob pattern.`);
        }

        const mode = rule.mode ?? "responsive";

        if (mode !== "responsive" && mode !== "single") {
            throw new Error(
                `Rule "${rule.match}" has unsupported mode "${mode}".`,
            );
        }

        if (mode === "responsive" && !presets[rule.preset]) {
            throw new Error(
                `Rule "${rule.match}" references unknown preset "${rule.preset}".`,
            );
        }

        if (mode === "single" && rule.preset !== undefined) {
            throw new Error(
                `Single-output rule "${rule.match}" must not define a preset.`,
            );
        }

        return { ...rule, mode, matcher: globToRegExp(rule.match) };
    });
};

const collectSourceImages = async (directory) => {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((first, second) =>
        first.name < second.name ? -1 : first.name > second.name ? 1 : 0,
    );

    const files = [];

    for (const entry of entries) {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...(await collectSourceImages(entryPath)));
        } else if (
            entry.isFile() &&
            supportedExtensions.has(path.extname(entry.name).toLowerCase())
        ) {
            files.push(entryPath);
        }
    }

    return files;
};

const canAccess = async (filePath) => {
    try {
        await access(filePath);
        return true;
    } catch {
        return false;
    }
};

const readCache = async () => {
    try {
        const cache = JSON.parse(await readFile(cachePath, "utf8"));

        if (
            cache.version !== cacheVersion ||
            typeof cache.images !== "object"
        ) {
            return { version: cacheVersion, images: {} };
        }

        return cache;
    } catch {
        return { version: cacheVersion, images: {} };
    }
};

const writeCache = async (cache, previousSerializedCache) => {
    const sortedImages = Object.fromEntries(
        Object.entries(cache.images).sort(([firstPath], [secondPath]) =>
            firstPath < secondPath ? -1 : firstPath > secondPath ? 1 : 0,
        ),
    );
    const serializedCache = `${JSON.stringify(
        { version: cacheVersion, images: sortedImages },
        null,
        2,
    )}\n`;

    if (serializedCache === previousSerializedCache) return;

    await mkdir(path.dirname(cachePath), { recursive: true });
    await replaceWithTemporaryFile(cachePath, (temporaryPath) =>
        writeFile(temporaryPath, serializedCache, "utf8"),
    );
};

const createProcessingFingerprint = async (
    sourcePath,
    relativePath,
    mode,
    preset,
) => {
    const sourceBuffer = await readFile(sourcePath);
    const processingConfiguration = JSON.stringify(
        mode === "single"
            ? {
                  version: cacheVersion,
                  relativePath,
                  output: {
                      format: "webp",
                      lossless: true,
                      preserveDimensions: true,
                  },
              }
            : {
                  version: cacheVersion,
                  relativePath,
                  thumbnail: {
                      width: preset.width,
                      height: preset.height,
                      fit: thumbnailOptions.fit,
                      position: thumbnailOptions.position,
                      format: "webp",
                      quality: thumbnailOptions.quality,
                  },
                  full: { format: "webp", lossless: true },
              },
    );

    return createHash("sha256")
        .update(sourceBuffer)
        .update(processingConfiguration)
        .digest("hex");
};

const isValidWebp = async (filePath, expectedWidth, expectedHeight) => {
    if (!(await canAccess(filePath))) return false;

    try {
        const metadata = await sharp(filePath).metadata();

        return (
            metadata.format === "webp" &&
            metadata.width === expectedWidth &&
            metadata.height === expectedHeight
        );
    } catch {
        return false;
    }
};

const needsGeneration = async ({
    outputPath,
    expectedWidth,
    expectedHeight,
    configurationChanged,
}) => {
    if (configurationChanged) return true;

    if (!(await isValidWebp(outputPath, expectedWidth, expectedHeight))) {
        return true;
    }

    return false;
};

const replaceWithTemporaryFile = async (outputPath, writeTemporaryFile) => {
    const temporaryPath = `${outputPath}.${process.pid}.${Date.now()}.tmp`;

    try {
        await writeTemporaryFile(temporaryPath);
        await rename(temporaryPath, outputPath);
    } finally {
        await rm(temporaryPath, { force: true });
    }
};

const processSourceImage = async ({
    sourcePath,
    relativePath,
    mode,
    preset,
    configurationChanged,
}) => {
    const parsedPath = path.parse(relativePath);
    const relativeDirectory = parsedPath.dir;
    const outputDirectory = path.join(outputRoot, relativeDirectory);
    const thumbnailPath = path.join(
        outputDirectory,
        `${parsedPath.name}.thumb.webp`,
    );
    const fullPath = path.join(outputDirectory, `${parsedPath.name}.full.webp`);
    const sourceMetadata = await sharp(sourcePath).metadata();

    if (!sourceMetadata.width || !sourceMetadata.height) {
        throw new Error("Could not determine source image dimensions.");
    }

    if (mode === "single") {
        const outputPath = path.join(
            outputDirectory,
            `${parsedPath.name}.webp`,
        );
        const generateOutput = await needsGeneration({
            outputPath,
            expectedWidth: sourceMetadata.width,
            expectedHeight: sourceMetadata.height,
            configurationChanged,
        });

        if (generateOutput) {
            await mkdir(outputDirectory, { recursive: true });
            await replaceWithTemporaryFile(outputPath, (temporaryPath) =>
                sharp(sourcePath)
                    .webp({ lossless: true })
                    .toFile(temporaryPath),
            );
        }

        let removedLegacyVariant = false;

        for (const legacyPath of [thumbnailPath, fullPath]) {
            if (await canAccess(legacyPath)) {
                await rm(legacyPath);
                removedLegacyVariant = true;
            }
        }

        return generateOutput || removedLegacyVariant;
    }

    const generateThumbnail = await needsGeneration({
        outputPath: thumbnailPath,
        expectedWidth: preset.width,
        expectedHeight: preset.height,
        configurationChanged,
    });
    const generateFull = await needsGeneration({
        outputPath: fullPath,
        expectedWidth: sourceMetadata.width,
        expectedHeight: sourceMetadata.height,
        configurationChanged,
    });

    if (!generateThumbnail && !generateFull) return false;

    await mkdir(outputDirectory, { recursive: true });

    if (generateThumbnail) {
        await replaceWithTemporaryFile(thumbnailPath, (temporaryPath) =>
            sharp(sourcePath)
                .resize({
                    width: preset.width,
                    height: preset.height,
                    fit: thumbnailOptions.fit,
                    position: thumbnailOptions.position,
                })
                .webp({ quality: thumbnailOptions.quality })
                .toFile(temporaryPath),
        );
    }

    if (generateFull) {
        await replaceWithTemporaryFile(fullPath, (temporaryPath) =>
            sharp(sourcePath).webp({ lossless: true }).toFile(temporaryPath),
        );
    }

    return true;
};

const formatDuration = (milliseconds) => `${(milliseconds / 1000).toFixed(2)}s`;

const main = async () => {
    const startedAt = performance.now();
    const configuredRules = validateConfiguration();
    const [sourceFiles, cache] = await Promise.all([
        collectSourceImages(sourceRoot),
        readCache(),
    ]);
    const previousSerializedCache = (await canAccess(cachePath))
        ? await readFile(cachePath, "utf8")
        : "";
    const counters = { processed: 0, skipped: 0, failed: 0 };

    for (const sourcePath of sourceFiles) {
        const relativePath = normalizePath(
            path.relative(sourceRoot, sourcePath),
        );
        const rule = configuredRules.find(({ matcher }) =>
            matcher.test(relativePath),
        );

        if (!rule) {
            counters.failed += 1;
            console.error(`[failed] No image rule matches: ${relativePath}`);
            continue;
        }

        try {
            const fingerprint = await createProcessingFingerprint(
                sourcePath,
                relativePath,
                rule.mode,
                rule.preset ? presets[rule.preset] : undefined,
            );
            const wasProcessed = await processSourceImage({
                sourcePath,
                relativePath,
                mode: rule.mode,
                preset: rule.preset ? presets[rule.preset] : undefined,
                configurationChanged:
                    cache.images[relativePath] !== fingerprint,
            });

            cache.images[relativePath] = fingerprint;

            if (wasProcessed) {
                counters.processed += 1;
            } else {
                counters.skipped += 1;
            }
        } catch (error) {
            counters.failed += 1;
            console.error(`[failed] ${relativePath}: ${error.message}`);
        }
    }

    await writeCache(cache, previousSerializedCache);

    console.log("\nImage optimization summary");
    console.log(`Source images: ${sourceFiles.length}`);
    console.log(`Processed: ${counters.processed}`);
    console.log(`Skipped: ${counters.skipped}`);
    console.log(`Failed: ${counters.failed}`);
    console.log(`Time: ${formatDuration(performance.now() - startedAt)}`);

    if (counters.failed > 0) process.exitCode = 1;
};

main().catch((error) => {
    console.error(`[fatal] ${error.message}`);
    process.exitCode = 1;
});
