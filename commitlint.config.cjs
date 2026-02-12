const config = require('./cz-config.cjs');

const ruleTypes = config.types.map(item => item.value);
const ruleScopes = config.scopes.map(item => item.name);

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'body-max-length': [2, 'always', 200],
    'footer-max-length': [2, 'always', 72],
    'type-enum': [2, 'always', ruleTypes],
    'scope-enum': [2, 'always', ruleScopes],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
  },
};
