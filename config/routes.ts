export default [
    {
        path: '/',
        component: '@/index',
        routes: [
            { path: '/', redirect: '/index', exact: true },
            {
                path: '/index',
                component: '@/pages/index',
                // 精准匹配会导致动态路由失效，因为动态路由是不确定的 url，所以需要模糊匹配
                routes: [
                    {
                        path: '/index/:article',
                        component: '@/pages/index/article',
                    },
                ],
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

            { component: '@/pages/404' },
        ],
    },
]
