import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  extraBabelPlugins: ['@babel/plugin-proposal-optional-chaining'],
  base: '/fe/amis',
  qiankun: {
    slave: {},
  },
  fastRefresh: true,
  // 热更新加速方案 https://github.com/umijs/umi/issues/6766
  // mfsu: {},
  // 禁用掉默认的title生成规则，根据document.ejs生成
  publicPath: '/fe/amis/static/',
  outputPath: '/dist/static',
  // 动态加载
  dva: {
    // lazyLoad: true,
    // 启用 immer 以方便修改 reducer
    immer: {
      enableES5: true,
    },
  },
  routes,
  define: {
    BASE_URL: '/',
  },
});
