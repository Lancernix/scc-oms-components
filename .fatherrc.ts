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
  platform: 'browser', // esm默认就是browser
  targets: {
    // 运行环境兼容性
    ie: 11,
  },
  esm: {
    input: 'src', // 默认值就是src
    output: 'esm',
    ignores: [
      'src/**/demo/**', // 避免打包demo文件到npm包里面
    ],
    // 额外的babel插件，这里直接使用corejs进行了polyfill
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
  cjs: {
    input: 'src', // 默认值就是src
    output: 'cjs',
    ignores: [
      'src/**/demo/**', // 避免打包demo文件到npm包里面
    ],
    // 额外的babel插件，这里直接使用corejs进行了polyfill
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
  umd: {
    entry: 'src/index.ts',
    name: 'scc-oms-components',
    output: 'dist',
    externals: {
      "@ant-design/icons": "icons",
      "antd": "antd",
      "moment": "moment",
      "react": "React",
      "react-dom": "ReactDOM"
    },
  }
});
