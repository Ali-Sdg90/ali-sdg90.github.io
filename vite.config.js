import process from "node:process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: process.env.VITE_BASE || "/",
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                portfolio: "index.html",
                links: "links/index.html",
            },
        },
    },
});
