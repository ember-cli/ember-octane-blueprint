module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
  },
  plugins: ["node"],
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  env: {
    browser: false,
    node: true,
    es6: true,
  },
  rules: {
  }
};
