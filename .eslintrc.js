module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": "error",
        "indent": 0
    },
    "env": {
        "browser": true,
        "node": true
    }
};