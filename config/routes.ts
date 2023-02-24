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
]

export default [
    {
        path: '/',
        component: '@/index',
        routes: [
            { path: '/', redirect: '/index', exact: true },
            ...BASE_ROUTES,
            ...EXTRACT_ROUTES,
        ],
    },
    { component: '@/pages/404' },
]
