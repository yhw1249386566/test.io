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
    dynamicImport: {
        loading: '@/component/loading',
    },
    nodeModulesTransform: {
        type: 'none',
    },
})
