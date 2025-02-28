import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  core: {
    builder: "@storybook/builder-vite", // 👈 The builder enabled here.
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  previewHead: (head) => `
    <script type="module" src="https://js.arcgis.com/calcite-components/2.13.2/calcite.esm.js"></script>
    <script type="module" src="https://js.arcgis.com/calcite-components/2.13.2/calcite.css"></script>
    <link rel="stylesheet" href="https://js.arcgis.com/4.31/@arcgis/core/assets/esri/themes/light/main.css" />
    <script type="importmap">
      {
        "imports": {
          "@arcgis/core/": "https://js.arcgis.com/4.31/@arcgis/core/"
        }
      }
    </script>
    <script type="module" src="https://js.arcgis.com/map-components/4.31/arcgis-map-components.esm.js"></script>
    <script type="module" src="https://js.arcgis.com/map-components/4.31/arcgis-map-components.css"></script>
    <style>
      .docs-story > div > div {
        width: 100%;
        height: 500px;
      }
    </style>
    ${head}
  `,
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      server: {
        proxy: {
          "/load": "http://localhost:4000",
          "/save": "http://localhost:4000",
        },
      },
    });
  },
};
export default config;
