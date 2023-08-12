const BASE_ROUTES = [
    {
        path: '/index',
        component: '@/pages/index',
    },
    {
        path: '/type',
        component: '@/pages/type',
        exact: true,
    },
    {
        path: '/mood',
        component: '@/pages/mood',
        exact: true,
    },
    {
        path: '/about',
        component: '@/pages/about',
        exact: true,
    },
]

const EXTRACT_ROUTES = [
    {
        path: '/feature/:name',
        component: '@/pages/feature',
        exact: true,
    },
    // 在 article 选择标题时会更换地址类似为：/#/heading-1，导致路由不能匹配，所以这里加个匹配的路由，跳回 article
    {
        path: '/heading-*',
        component: '@/pages/feature',
    },
]

export default [
    {
        path: '/',
        component: '@/index',
        routes: [
            { path: '/', redirect: '/index', exact: true },
            ...BASE_ROUTES,
            ...EXTRACT_ROUTES,
            { path: '/*', component: '@/pages/404' },
        ],
    },
]
