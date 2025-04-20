module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
        url: "http://localhost:5173",
    },
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],   
}