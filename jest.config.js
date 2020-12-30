module.exports = {
    collectCoverage: true,
    transform: { '\\.js$': 'babel-jest', },
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/scripts/__mocks__/fileMock.js",
        "\\.(css)$": "<rootDir>/scripts/__mocks__/styleMock.js"
    },
    "verbose": false
};
