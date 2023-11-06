import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: {
    output: 'dist/esm',
    ignores: [
      'src/**/demo/**', // 避免打包demo文件到npm包里面
    ],
  },
  cjs: {
    output: 'dist/lib',
    ignores: [
      'src/**/demo/**', // 避免打包demo文件到npm包里面
    ],
  },
});
