import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    globals: true, // makes expect, describe, it global
    environment: "jsdom", // needed for react-testing-library
    setupFiles: [path.resolve(__dirname, ".storybook/vitest.setup.ts")],
    include: ["src/**/*.test.{ts,tsx}", "src/**/*.spec.{ts,tsx}"], // run only actual test files
    exclude: ["**/*.stories.*"], // skip Storybook stories
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
