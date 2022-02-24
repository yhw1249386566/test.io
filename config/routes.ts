export default [
    {
        path: '/',
        component: '@/layouts/contain',
        routes: [
            { path: '/', redirect: '/index', exact: true },
            {
                path: '/index',
                component: '@/pages/index',
            },
            {
                path: '/type',
                component: '@/pages/type',
            },
            {
                path: '/mood',
                component: '@/pages/mood',
            },
            {
                path: '/about',
                component: '@/pages/about',
            },
        ]

    },

]