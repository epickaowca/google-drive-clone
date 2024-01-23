/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/mocks/fileMock.ts",
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/tests/mocks/styleMock.ts",
    "(assets|models|services)": "<rootDir>/tests/mocks/fileMock.ts",
  },
  // to obtain access to the matchers.
  setupFilesAfterEnv: ["./tests/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom",
};
