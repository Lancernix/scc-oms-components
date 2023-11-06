const { types } = require('./.cz-config.js');

const ruleTypes = types.map(item => item.value);

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'body-max-length': [2, 'always', 72],
    'footer-max-length': [2, 'always', 72],
    'type-enum': [2, 'always', [...ruleTypes]],
  },
};
