export enum RouteName {
    Index = '首页',
    Type = '分类',
    Mood = '心情',
    About = '关于',
}

export enum RouteLink {
    Index = 'index',
    Type = 'type',
    Mood = 'mood',
    About = 'about',
}

export enum EVENT_EMITTER_NAME {
    // 只有当仅仅存在文章时，此事件才会被监听和触发。
    OPEN_ARTICLE_DIRECTORY = 'openArticleDirectoryOnlyArticle',
}
