import { defineConfig } from 'umi'

import routes from './routes'

export default defineConfig({
    publicPath: './',
    title: 'Yomua',
    favicon: 'no',
    devtool: 'source-map',
    routes,
    fastRefresh: {},
    // mfsu 可能会造成一些 bug
    mfsu: {},
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
    // build 时，将 from 目录复制到 to 目录
    // copy: [
    //     {
    //         from: 'src/article',
    //         to: 'article',
    //     },
    // ],
    // 使用 webpack 5
    webpack5: {},
    chainWebpack(config, { env, webpack, createCSSRule }) {
        config.module
            .rule('compile')
            .test(/\.html$/i)
            .use('html-loader')
            .loader('html-loader')

        return config
    },
    // 全局注入 less 文件
    lessLoader: {
        // Reference： https://juejin.cn/s/less-loader%20modifyvars%20hack
        modifyVars: {
            hack: 'true; @import "~@/assets/less/_index.less";',
        },
    },
})
