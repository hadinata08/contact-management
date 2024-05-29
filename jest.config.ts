import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl|svg)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$", "\\.svg$"],
};

export default config;
