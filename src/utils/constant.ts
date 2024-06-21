import path from 'path'
import Dotenv from 'dotenv'
import log from '@yomua/y-tlog'

import { EnvValueType, JSValueType } from './utils.d'

export const CONVERT_TYPE_MAP: Record<
    JSValueType,
    (value: string) => EnvValueType<JSValueType>
> = {
    string: (value) => value,
    number: (value) => Number(value),
    boolean: (value) => value.toLowerCase() === 'true',
    null: () => null,
    undefined: () => undefined,
    bigInt: (value) => BigInt(value),
    symbol: (value) => Symbol(value),
    object: (value) => {
        try {
            return JSON.parse(value)
        } catch (error: any) {
            log.group('JSON.parse 失败', [
                { type: 'error', message: error },
                {
                    message: `要解析的值为: ${
                        value === '' ? '空字符串' : value
                    }`,
                },
            ])
            return null
        }
    },
    array: (value) => {
        try {
            return JSON.parse(value)
        } catch (error: any) {
            log.group('JSON.parse 失败', [
                { type: 'error', message: error },
                {
                    message: `要解析的值为: ${
                        value === '' ? '空字符串' : value
                    }`,
                },
            ])

            return []
        }
    },
    function: (value) => eval(`(${value})`),
}

// 这里的目的是因为: constants 存在打包之前就需要的 process.env 中的变量
// 所以需要在这里提前注入环境变量(否则是获取不到打包之前就需要的 process.env 的变量的)
// 即: umi 在进行打包 (使用 webpack) 时, 我们再这之前会执行 scripts/index.ts, 进行一些操作,
// => 而这些操作需要使用到环境变量, 在这里通过 dotenv 提前将 .env 注入到环境变量, 并读取然后赋值给常量
// => 从而在打包之前就可以使用这些值.
// - Ref: /** 以下变量用于打包之前的准备 */
const currentWorkingDir = process.cwd()
// 将指定文件的内容写入到环境变量中 (process.env)
Dotenv.config({ path: path.join(currentWorkingDir, '.env') })

/** 以下不需要导出，用在此文件 */

enum ENV_KEY {
    SCROLL_SPEED = 'SCROLL_SPEED',
    ARTICLE_DIR = 'ARTICLE_DIR',
    WRITE_ARTICLE_DIR = 'WRITE_ARTICLE_DIR',
    ARTICLE_PICtURE = 'ARTICLE_PICtURE',
    ARTICLE_SUFFIX_NAME = 'ARTICLE_SUFFIX_NAME',
    ARTICLE_COMMIT_LAST_DATE = 'ARTICLE_COMMIT_LAST_DATE',
}

const getEnvValue = <ReturnType extends JSValueType, DataType = ReturnType>(
    envKey: ENV_KEY,
    options?: {
        returnType?: ReturnType
    },
): EnvValueType<ReturnType, DataType> => {
    if (envKey === undefined || envKey === null) {
        return null as EnvValueType<ReturnType, DataType>
    }

    const { returnType = 'string' } = options ?? {}

    const converter = CONVERT_TYPE_MAP[returnType]

    if (!converter) {
        throw new Error('类型不存在')
    }

    const enValue = process.env[envKey] ?? ''

    if (returnType === 'array' && enValue.includes(',')) {
        return enValue.toString().split(',') as EnvValueType<
            ReturnType,
            DataType
        >
    }

    return converter(process.env[envKey] ?? '') as EnvValueType<
        ReturnType,
        DataType
    >
}

/** 以上不需要导出，用在此文件 */

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

export enum LOCAL_STORAGE_NAME {
    SELECTED_ARTICLE_KEY = 'selectedArticleKey',
    ARTICLE_TREE_EXPANDED_KEYS = 'articleTreeExpandedKeys',
    DATA_THEME = 'data-theme',
    GPT3_CHAT_INFORMATION = 'gpt3_chat_information',
    SEARCH_HISTORY_RESULT = 'searchHistoryResult',
}

// 所有自定义事件名
export enum EVENT_NAME {
    // 只有当视区内只显示文章时，此事件才会被监听和触发。
    OPEN_ARTICLE_DIRECTORY = 'openArticleDirectoryOnlyArticle',
    HEADER_MENU_ICON = 'headerMenuIcon',
}

/************************* 以下都是 .env 中的变量值 *************************/

export const SCROLL_SPEED = getEnvValue<'number'>(ENV_KEY.SCROLL_SPEED, {
    returnType: 'number',
})

/** 以下变量即用于打包之前, 也用于打包后的运行时 */

export const ARTICLE_COMMIT_LAST_DATE = getEnvValue<'string'>(
    ENV_KEY.ARTICLE_COMMIT_LAST_DATE,
)

export const ARTICLE_SUFFIX_NAME = getEnvValue<'array', string>(
    ENV_KEY.ARTICLE_SUFFIX_NAME,
    { returnType: 'array' },
)

/** 以上变量即用于打包之前, 也用于打包后的运行时 */

/** 以下变量用于打包之前的准备 */

export const ARTICLE_DIR = getEnvValue<'string'>(ENV_KEY.ARTICLE_DIR)

export const ARTICLE_PICtURE = getEnvValue<'string'>(ENV_KEY.ARTICLE_PICtURE)

export const WRITE_ARTICLE_DIR = getEnvValue<'string'>(
    ENV_KEY.WRITE_ARTICLE_DIR,
)

/** 以上变量用于打包之前的准备 */

/************************* 以上都是 .env 中的变量值 *************************/
