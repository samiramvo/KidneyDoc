// module.exports = {
//   presets: ["@babel/preset-env", "@babel/preset-react"],

//   // ... autres configurations si nécessaire ...
// };

// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
  ],
};
