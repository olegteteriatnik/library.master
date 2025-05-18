/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/specs/**/*.spec.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    verbose: true
};
