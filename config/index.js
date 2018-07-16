// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8190,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/pbap-web/action/': {
        // target: 'http://192.168.1.215:8350',
        // target: 'http://192.168.1.215:8080',
        // target: 'http://192.168.1.215:8380',
      //  target: 'http://ly.zhongke.com:9180',
       // target: 'http://106.15.76.124:3580/pbap-web',
        target:'http://74.207.251.145:3580',
        // target:'http://ly00400.uicp.cn:14713',
       //    target:'http://localhost:9180',
        // target: 'http://192.168.1.215:8416',
        // target: 'http://192.168.1.126:8080',
        // target: 'http://192.168.1.128:8080',   /* 老陈 */
        // target: 'http://192.168.1.130:8080',   /* 老毕 */
        changeOrigin: true,
        pathRewrite: {
          '^/pbap-web': '/pbap-web'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
