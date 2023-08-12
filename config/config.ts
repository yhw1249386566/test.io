import { defineConfig } from 'umi'

import routes from './routes'

export default defineConfig({
    publicPath: '/',
    title: 'Yomua',
    favicon: 'src/assets/favicon.png',
    devtool: 'source-map',
    routes,
    fastRefresh: {},
    // mfsu 可能会造成一些 bug
    mfsu: {},
    // history: {
    //     type: 'hash',
    // },
    // 加载时显示的 loading
    dynamicImport: {
        loading: '@/component/loading',
    },
    nodeModulesTransform: {
        type: 'none',
    },
    // 使用 webpack 5
    webpack5: {},
    chainWebpack(config, { env, webpack, createCSSRule }) {
        config.module
        // 配置 Markdown Loader
        config.module
            .rule('compile')
            .test(/\.html$/i)
            .use('html-loader')
            .loader('html-loader')
            .end()
            .rule('markdown')
            .test(/\.md$/)
            .use('html-loader')
            .loader('html-loader')
            .end()
            .use('markdown-loader')
            .loader('markdown-loader')
            .options({
                // Pass options to marked
                // See https://marked.js.org/using_advanced#options
                // For example, if you want to use a custom renderer:
                // renderer: new marked.Renderer(),
            })
            .end()

        return config
    },
    // 全局注入 less 文件
    lessLoader: {
        // Reference： https://juejin.cn/s/less-loader%20modifyvars%20hack
        modifyVars: {
            hack: 'true; @import "~@/assets/less/_index.less";',
        },
    },
    proxy: {
        // 访问目录是 /mock 的接口时，将被代理到 'http://heymock.uneedcode.com'
        '/mock': {
            target: 'http://heymock.uneedcode.com',
            changeOrigin: true,
            // pathRewrite: { '^/api': '' },
        },
    },
})
