module.exports = {
    "extends": "defaults/configurations/eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
          "sourceType": "script",
          "modules": false
        },
    },
    "env": {
      "es6": true,
      "node": true
    },
    "rules": {
      "no-restricted-globals": 0,
      "strict": [2, "global"]
    }
};