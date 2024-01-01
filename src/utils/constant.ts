import path from 'path'
import Dotenv from 'dotenv'

import log from './log'
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
        } catch (error) {
            log.group('JSON.parse 失败', {
                sub: [
                    { type: 'error', message: error },
                    {
                        type: 'log',
                        message: `要解析的值为: ${
                            value === '' ? '空字符串' : value
                        }`,
                    },
                ],
            })
            return null
        }
    },
    array: (value) => {
        try {
            return JSON.parse(value)
        } catch (error) {
            log.group('JSON.parse 失败', {
                sub: [
                    { type: 'error', message: error },
                    {
                        type: 'log',
                        message: `要解析的值为: ${
                            value === '' ? '空字符串' : value
                        }`,
                    },
                ],
            })

            return null
        }
    },
    function: (value) => eval(`(${value})`),
}

// 这里的目的是因为: constants 存在打包之前就需要的 process.env 中的变量
// 所以需要在这里提前注入环境变量
const currentWorkingDir = process.cwd()
Dotenv.config({ path: path.join(currentWorkingDir, '.env') })

/** 以下不需要导出，用在此文件 */

enum ENV_KEY {
    SCROLL_SPEED = 'SCROLL_SPEED',
    ARTICLE_DIR = 'ARTICLE_DIR',
    WRITE_ARTICLE_DIR = 'WRITE_ARTICLE_DIR',
    ARTICLE_PICtURE = 'ARTICLE_PICtURE',
    ARTICLE_SUFFIX_NAME = 'ARTICLE_SUFFIX_NAME',
}

const getEnvValue = <ReturnType extends JSValueType = 'string'>(
    envKey: ENV_KEY,
    options?: {
        returnType?: ReturnType
    },
): EnvValueType<ReturnType> => {
    if (envKey === undefined || envKey === null) {
        return null as EnvValueType<ReturnType>
    }

    const { returnType = 'string' } = options ?? {}

    const converter = CONVERT_TYPE_MAP[returnType]

    if (!converter) {
        throw new Error('类型不存在')
    }

    return converter(process.env[envKey] ?? '') as EnvValueType<ReturnType>
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
    ARTICLE_FILE_PATH = 'activeFilePath',
    ARTICLE_TREE_EXPANDED_KEYS = 'articleTreeExpandedKeys',
    DATA_THEME = 'data-theme',
    GPT3_CHAT_INFORMATION = 'gpt3_chat_information',
}

// 所有自定义事件名
export enum EVENT_EMITTER_NAME {
    // 只有当视区内只显示文章时，此事件才会被监听和触发。
    OPEN_ARTICLE_DIRECTORY = 'openArticleDirectoryOnlyArticle',
    SHOW_HEADER_X = 'showHeaderX',
}

/************************* 以下都是 .env 中的变量值 *************************/

export const SCROLL_SPEED = getEnvValue(ENV_KEY.SCROLL_SPEED, {
    returnType: 'number',
})

/** 以下变量即用于打包之前, 也用于打包后的运行时 */

export const ARTICLE_SUFFIX_NAME = getEnvValue(ENV_KEY.ARTICLE_SUFFIX_NAME)

/** 以上变量即用于打包之前, 也用于打包后的运行时 */

/** 以下变量用于打包之前的准备 */

export const ARTICLE_DIR = getEnvValue(ENV_KEY.ARTICLE_DIR)

export const ARTICLE_PICtURE = getEnvValue(ENV_KEY.ARTICLE_PICtURE)

export const WRITE_ARTICLE_DIR = getEnvValue(ENV_KEY.WRITE_ARTICLE_DIR)

/** 以上变量用于打包之前的准备 */

/************************* 以上都是 .env 中的变量值 *************************/
