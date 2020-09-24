/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * 根据项目需求配置了生产环境下面的测试环境
 * 运行：  npm run start:test
 * 代理地址：http://192.168.0.119:11000
 *
 */
export default {
  dev: {
    '/api/': {
      // target: 'https://preview.pro.ant.design',
      target: 'http://localhost:8081/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  test: {
    '/api/': {
      target: 'http://localhost:8081/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
