module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
  ],
  "plugins": [
    "import"
  ],
  "ecmaFeatures": {
    "modules": true,
    "experimentalObjectRestSpread": true
  },
  "globals": {
    "document": true
  },
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 1,
    "comma-dangle": 2,
    "no-unreachable": 2,
    "no-param-reassign": 0,
    "no-unused-vars": 0,
    "no-var": 2,
    "semi": 2,
    "object-shorthand": 2,
    "prefer-arrow-callback": 2,
    "prefer-const": 2,
    "prefer-spread": 2,
    "react/prefer-stateless-function": 0,
    "react/forbid-prop-types": 0,
    "prefer-template": 2,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
}
