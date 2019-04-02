module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {    
        "no-console":"off",
        "no-multi-spaces":"off",
        "no-restricted-syntax": ["error", "WithStatement"],
        "no-param-reassign": 0,
        "linebreak-style": 0,
    }
}