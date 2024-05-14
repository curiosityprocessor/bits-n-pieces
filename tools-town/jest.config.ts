import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testMatch: ["<rootDir>/test/**/*.test.ts"],
};

export default jestConfig