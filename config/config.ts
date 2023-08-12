import { defineConfig } from 'umi'

import routes from './routes'

export default defineConfig({
    publicPath: '/',
    title: 'Yomua',
    favicon: '/assets/favicon.png',
    devtool: 'source-map',
    routes,
    fastRefresh: {},
    // mfsu 可能会造成一些 bug
    hash: true,
    mfsu: {},
    // 使用 hash: 避免部署到 github pages 时，当地址为 /feature/article 或其他没有 html 的路由时，刷新页面 404 的问题。
    history: {
        type: 'hash',
    },
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
