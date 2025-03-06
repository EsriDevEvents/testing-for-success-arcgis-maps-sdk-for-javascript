import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  core: {
    builder: "@storybook/builder-vite", // 👈 The builder enabled here.
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // inserts calcite style
  // update .docs-story to display the map, otherwise story renders blank
  previewHead: (head) => `
    <link rel="stylesheet" href="https://js.arcgis.com/4.32/@arcgis/core/assets/esri/themes/light/main.css" />
    <style>
      .docs-story > div > div {
        width: 100%;
        height: 500px;
      }
    </style>
    ${head}
  `,
};
export default config;
