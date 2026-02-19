import type { StorybookConfig } from "@storybook/react-vite";
import addonVitest from "@storybook/addon-vitest";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", addonVitest],
  framework: "@storybook/react-vite",
};
export default config;
