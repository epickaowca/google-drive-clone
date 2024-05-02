/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/mocks/fileMock.ts",
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/tests/mocks/styleMock.ts",
    "^@root(.*)$": "<rootDir>/src$1",
    "^@tests(.*)$": "<rootDir>/tests$1",
  },
  setupFilesAfterEnv: ["./tests/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom",
};
