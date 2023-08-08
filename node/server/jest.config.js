module.exports = {
    verbose: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testMatch: ['<rootDir>/src/test/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
