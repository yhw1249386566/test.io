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
        // 采用 * 通配符，是为了匹配 /feature/article/xxx.md
        // 因为我们将路由模式改成了 history,
        // 且让 article 页面地址友好的显示为: https://www.whyhw.com/feature/article/xxx.md
        path: '/feature/:name*',
        component: '@/pages/feature',
        exact: true,
    },
    // 在 article 选择标题时会更换地址类似为：/#/heading-1，导致路由不能匹配，所以这里加个匹配的路由，跳回 article
    // 这是 hash 路由模式的情况, history 路由已经由 /feature/:name* 处理
    // {
    //     path: '/heading-*',
    //     component: '@/pages/feature',
    // },
]

export default [
    {
        path: '/',
        component: '@/index',
        routes: [
            { path: '/', redirect: '/index', exact: true },
            ...BASE_ROUTES,
            ...EXTRACT_ROUTES,
            // 目前这个路由作用不大了, 因为采用了 history 路由模式;
            // => 对于 github pages 托管的且采用了 history 的页面, 如果通过 url 找不到资源, 则会直接访问根路径的 404.html(若有)
            // => REF: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site
            // 当然也不能说一点用没有, 如果不是直接从浏览器第一次加载进来的, 那么后续 umi 的路由监听仍然起效,
            // 即: 从代码中跳到的路由如果没有相匹配的资源, 就会走这个兜底路由
            { path: '/*', component: '@/pages/404' },
        ],
    },
]
