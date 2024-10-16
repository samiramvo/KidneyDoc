// jest.config.js
// module.exports = {
//   transform: {
//     "^.+\\.jsx?$": "babel-jest",
//     "^.+\\.mjs$": "babel-jest",
//   },
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//   testEnvironment: "node",
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//     "^@/(.*)$": "<rootDir>/$1", // Ajoutez cette ligne pour mapper l'alias '@'
//   },
// };
// jest.config.js
module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "node",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!next-auth)/", // Ajoutez ici les modules que vous souhaitez transformer
  ],
};
