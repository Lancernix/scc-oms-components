module.exports = {
  pluginSearchDirs: false,
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
  printWidth: 120,
  trailingComma: "all",
  singleQuote: true,
  jsxSingleQuote: false,
  semi: true,
  bracketSpacing: true,
  arrowParens: "avoid",
  useTabs: false,
  quoteProps: "as-needed",
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
};
