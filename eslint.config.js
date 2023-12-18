import antfu from '@antfu/eslint-config';

export default await antfu(
  {
    react: true,
    typescript: true,
    stylistic: {
      semi: true,
    },
    markdown: false,
    plugins: {
      'eslint-plugin-react': {
        version: 'detect',
      },
    },
    rules: {
      'style/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
          multilineDetection: 'brackets',
        },
      ],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }], // 允许callback中使用named function
      'max-len': ['error', { code: 120, ignoreComments: true }], // 每行120个字符
      'style/arrow-parens': ['error', 'as-needed'], // 箭头函数参数一个时不需要括号
      'ts/no-unused-vars': 'error', // 没用的变量报错
      'curly': ['error', 'all'], // 不能省略大括号
      'style/brace-style': ['error', '1tbs'], // 使用常规的大括号样式
      'style/indent': ['error', 2, { offsetTernaryExpressions: false, SwitchCase: 1 }], // 缩进设置
      'style/eol-last': 'off',
    },
    ignores: ['pnpm-lock.yaml'],
  },
  {
    // demo文件夹中的tsx允许console
    files: ['src/**/**/demo/**.tsx'],
    rules: {
      'no-console': 'off',
    },
  },
);
