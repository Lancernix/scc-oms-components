import { resolve } from 'node:path';
import { version as runtimeVersion } from '@babel/plugin-transform-runtime/package.json';
import { defineConfig } from 'father';

/** father编译配置，详细配置项参见：https://github.com/umijs/father/blob/master/docs/config.md */
export default defineConfig({
  alias: {
    components: resolve(__dirname, 'src/components'),
    utils: resolve(__dirname, 'src/utils'),
    hooks: resolve(__dirname, 'src/hooks'),
  },
  esm: {
    input: 'src', // 默认值就是src
    output: 'dist',
    ignores: [
      'src/**/demo/**', // 避免打包demo文件到npm包里面
    ],
    platform: 'browser', // esm默认就是browser
    targets: {
      // 运行环境兼容性
      chrome: 49,
      firefox: 64,
      safari: 5,
      edge: 13,
      ios: 10,
      ie: 11,
    },
    extraBabelPresets: ['@babel/preset-env'], // 额外的babel预设
    // 额外的babel插件
    extraBabelPlugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: { version: 3, proposals: true },
          version: runtimeVersion,
        },
      ],
    ],
  },
});
