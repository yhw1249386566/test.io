import { getEnvConvertTypeValue } from '.'

// const getEnvValue = <T extends JSType>(
//     envKey: ENV_KEY,
//     options?: {
//         returnType?: T
//     },
// ): EnvValueType<T> => {
//     if (envKey === undefined || envKey === null) {
//         return null as EnvValueType<T>
//     }

//     const { returnType = 'string' } = options ?? {}

//     const converter = getEnvConvertTypeValue[returnType]

//     if (!converter) {
//         throw new Error('类型不存在')
//     }

//     console.log('__process.env', process.env, process.env['SCROLL_SPEED'])

//     debugger

//     return converter(process.env[envKey] ?? '')
// }

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
    // 只有当视区内只显示文章时，此事件才会被监听和触发。
    OPEN_ARTICLE_DIRECTORY = 'openArticleDirectoryOnlyArticle',
}

/** 以下都是 .env 中的变量值 */

// 为什么不使用 getEnvValue, 这是因为 dotenv-webpack 在将环境变量注入到 process.env 时, 定义了只能对显示使用环境变量值才可以获取导致。
// 如: process.env.SCROLL_SPEED 能得到值, 但是 const envName = 'SCROLL_SPEED', process.env[SCROLL_SPEED] 则不行。
export const SCROLL_SPEED = getEnvConvertTypeValue(process.env.ff, {
    type: 'number',
})

/** 以上都是 .env 中的变量值 */
