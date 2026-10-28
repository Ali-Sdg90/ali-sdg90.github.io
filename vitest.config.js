import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [react()],
    test: {
        include: ["tests/unit/**/*.test.{js,jsx}"],
        environment: "jsdom",
        setupFiles: ["./tests/setup/vitest.js"],
        clearMocks: true,
        restoreMocks: true,
    },
});
