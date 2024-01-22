import { resolve } from 'node:path';
import { defineConfig } from 'dumi';

/** dumi文档相关的配置，详细配置参见：https://d.umijs.org/config */
export default defineConfig({
  // 文档demo需要的路径别名，和编译时是一样的
  alias: {
    components: resolve(__dirname, 'src/components'),
    utils: resolve(__dirname, 'src/utils'),
    hooks: resolve(__dirname, 'src/hooks'),
  },
  // 文档输出目录
  outputPath: 'docs-dist',
  // md文件解析配置
  resolve: {
    atomDirs: [
      { type: 'components', dir: './src/components' },
      { type: 'utils', dir: './src/utils' },
      { type: 'hooks', dir: './src/hooks' },
    ],
  },
  // 主题配置项，文档相关的配置
  themeConfig: {
    name: 'scc-oms-components',
    nav: [
      { title: '组件', link: '/components/date-time-picker' },
      { title: '工具', link: '/utils/moment-transform' },
      { title: 'Hook', link: '/hooks/use-validated-form-values' },
    ],
    prefersColor: { default: 'auto' },
    showLineNum: true,
    nprogress: true,
  },
  // 全局的一些样式设置
  styles: [
    `.dumi-default-header-left {
      width: 360px !important
    }`,
    `.dumi-default-doc-layout > main {
      max-width: 1800px !important
    }`,
    `.dumi-default-sidebar {
      width: 240px !important;
    }`,
    `.dumi-default-doc-layout-toc-wrapper {
      width: 200px !important;
    }`,
    `.dumi-default-table-content > table {
      word-break: unset !important;
      margin-block-start: 0 !important;
      margin-block-end: 0 !important;
    }`,
    `.dumi-default-table-content > table > tbody > tr > td:nth-child(2) {
      width: 30% !important;
      min-width: 240px !important;
    }`,
    `.dumi-default-container.markdown {
      margin-top: 24px !important;
    }`,
    `.dumi-default-previewer {
      margin: 0 0 24px !important;
    }`,
  ],
});
