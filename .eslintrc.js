module.exports = {
  "extends": "airbnb",
  "installedESLint": true,
  "rules": {
    "import/no-extraneous-dependencies": ["off", {"devDependencies": false, "optionalDependencies": false, "peerDependencies": false}],
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true
  }
};