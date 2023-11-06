import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  /** 配置路径别名 */
  alias: {
    components: path.resolve(__dirname, 'src/components'),
    utils: path.resolve(__dirname, 'src/utils'),
    hooks: path.resolve(__dirname, 'src/hooks'),
  },
  resolve: {
    atomDirs: [
      { type: 'components', dir: './src/components' },
      { type: 'utils', dir: './src/utils' },
      { type: 'hooks', dir: './src/hooks' },
    ],
  },
  themeConfig: {
    name: 'scc-oms-components',
    nav: [
      { title: '组件', link: '/components/date-time-picker' },
      { title: '工具', link: '/utils/moment-transform' },
      { title: 'Hook', link: '/hooks/use-validated-form-values' },
    ],
    prefersColor: { default: 'auto' },
  },
  styles: [
    `.dumi-default-header-left {
      width: 360px !important
    }`,
    `.dumi-default-doc-layout > main {
      max-width: 1600px !important
    }`,
    `.dumi-default-sidebar {
      width: 240px !important;
    }`,
    `.dumi-default-doc-layout-toc-wrapper {
      width: 200px !important;
    }`,
  ],
});
