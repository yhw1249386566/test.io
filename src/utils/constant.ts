import Dotenv from 'dotenv'
import path from 'path'

import { JSType, EnvValueType } from './utils.d'

export const CONVERT_TYPE_MAP: Record<JSType, (value: string) => any> = {
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
            console.error('JSON.parse 失败')
            return null
        }
    },
    array: (value) => {
        try {
            return JSON.parse(value)
        } catch (error) {
            console.error('JSON.parse 失败', error)
            return null
        }
    },
    function: (value) => eval(`(${value})`),
}

/** 以下不需要导出，用在此文件 */

// 这两行用于打包之前读取环境变量
const currentWorkingDir = process.cwd()
Dotenv.config({ path: path.join(currentWorkingDir, '.env') })

enum ENV_KEY {
    SCROLL_SPEED = 'SCROLL_SPEED',
    ARTICLE_DIR = 'ARTICLE_DIR',
    WRITE_ARTICLE_DIR = 'WRITE_ARTICLE_DIR',
    ARTICLE_PICtURE = 'ARTICLE_PICtURE',
}

const getEnvValue = <ReturnType extends JSType = 'string'>(
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

    return converter(process.env[envKey] ?? '')
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

/** 以下变量用于打包之前的准备 */

export const ARTICLE_DIR = getEnvValue(ENV_KEY.ARTICLE_DIR)

export const ARTICLE_PICtURE = getEnvValue(ENV_KEY.ARTICLE_PICtURE)

export const WRITE_ARTICLE_DIR = getEnvValue(ENV_KEY.WRITE_ARTICLE_DIR)

/** 以上变量用于打包之前的准备 */

/************************* 以上都是 .env 中的变量值 *************************/
