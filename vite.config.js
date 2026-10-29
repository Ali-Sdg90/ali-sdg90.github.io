import process from "node:process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
    base: process.env.VITE_BASE || "/",
    plugins: [react()],
    ...(isSsrBuild
        ? {}
        : {
              build: {
                  rollupOptions: {
                      input: {
                          portfolio: "index.html",
                          staticDetailTemplate: "static-detail-template.html",
                          buildStory: "how-i-built-my-portfolio/index.html",
                          links: "links/index.html",
                          notFound: "404.html",
                      },
                  },
              },
          }),
}));
