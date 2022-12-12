import { defineConfig } from 'umi'
import routes from './routes'

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    publicPath: './',
    fastRefresh: {},
    // mfsu 可能会造成一些 bug
    mfsu: {},
    routes,
    history: {
        type: 'hash',
    },
})
