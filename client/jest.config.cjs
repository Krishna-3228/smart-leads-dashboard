module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          target: "es2023",
          lib: ["ES2023", "DOM"],
          module: "commonjs",
          moduleResolution: "node",
          skipLibCheck: true,
          jsx: "react-jsx",
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
};
