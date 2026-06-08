export default {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "header-max-length": [2, "always", 200],
    },
    ignores: [(message) => /^chore\(release\): bump version to /.test(message)],
};
