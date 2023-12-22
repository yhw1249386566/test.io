/* eslint-disable no-use-before-define */

import { EnvValueType, JSType } from './utils.d'
import { CONVERT_TYPE_MAP, LOCAL_STORAGE_NAME } from './constant'
import request from './request'

/** start --- 不需要导出 --- start */

type DirData = {
    [fileName: string]: string | DirData
}

type StorageDataKey<KeyType> = { key: KeyType; value: string }

const saveLocalStorage = (
    data: StorageDataKey<LOCAL_STORAGE_NAME>,
    // config?,
) => {
    const { key, value } = data

    if (!key) {
        log.error('saveLocalStorage key 不存在', key)
        return false
    }

    localStorage.setItem(key, value)

    return true
}

const saveBatchLocalStorage = (data: StorageDataKey<LOCAL_STORAGE_NAME>[]) => {
    data.forEach((item) => {
        const { key, value } = item ?? {}

        if (!key) {
            log.error('saveBatchLocalStorage key 不存在: ', key)
            return false
        }

        localStorage.setItem(key, value)
    })

    return true
}

const getLocalStorage = <ReturnType extends JSType = 'string'>(
    key: LOCAL_STORAGE_NAME,
    options?: { returnType?: ReturnType },
): EnvValueType<ReturnType> => {
    if (!key) {
        log.error('getLocalStorage: key 不存在')
        return '' as EnvValueType<ReturnType>
    }

    const { returnType = 'string' } = options ?? {}

    const converter = CONVERT_TYPE_MAP[returnType]

    return converter(localStorage.getItem(key) ?? '')
}

const clearLocalStorage = (key: LOCAL_STORAGE_NAME) => {
    if (!key) {
        log.warn('clearLocalStorage: key 不存在')
        return false
    }

    localStorage.removeItem(key)

    return true
}

const clearAllLocalStorage = () => {
    localStorage.clear()
    return true
}

const saveSessionStorage = (
    data: StorageDataKey<string>,
    // config?,
) => {
    const { key, value } = data

    if (!key) {
        log.error('saveSessionStorage: key 不存在')
        return
    }

    sessionStorage.setItem(key, value)
}

const getSessionStorage = (key: string) => {
    if (!key) {
        log.error('getSessionStorage: key 不存在')
        return ''
    }

    return sessionStorage.getItem(key) ?? ''
}

const LOGO_TYPE_MAP = {
    error: 'color: #fff; background-color: #f00',
    info: 'color: #fff; background-color: #00f',
    logo: 'color: #fff; background-color: #000',
    trace: 'color: #000; background-color: #fff',
}

const logoGroup = (
    title: string,
    options: {
        sub: {
            type: 'error' | 'info' | 'log' | 'trace'
            message: string | Error | unknown
        }[]
    },
) => {
    const { sub = [] } = options ?? {}

    console.group(`%c${title}`, 'color: #fff; background-color: #000')

    sub.forEach((item) => {
        const { type, message } = item

        console[type](`%c${message}`, LOGO_TYPE_MAP[type])
    })

    console.groupEnd()
}

/** end --- 不需要导出 --- end */

export const storage = {
    saveLocalStorage,
    saveBatchLocalStorage,
    getLocalStorage,
    clearLocalStorage,
    clearAllLocalStorage,
    saveSessionStorage,
    getSessionStorage,
}

export const log = {
    info: console.info,
    warn: console.warn,
    trace: console.trace,
    error: console.error,
    log: console.log,
    group: logoGroup,
}

export const delay = async (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time))

export const invertColor = (color: string) => {
    const colorValue: any = '0x' + color.replace(/#/g, '')
    const str = '000000' + (0xffffff - colorValue).toString(16)
    return '#' + str.substring(str.length - 6, str.length)
}

export const getChatLengthFromString = (str: string) => {
    let length = 0
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
            length += 1 // 英文字符长度为1
        } else {
            length += 2 // 中文字符长度为2
        }
    }
    return length
}

export const getDataType = <T>(data: T): JSType => {
    const type = Object.prototype.toString
        .call(data)
        .replace(/\[?\]?/g, '') // 'object String'
        .replace('object ', '') // String
        .replace(/\w/, (r) => r.toLowerCase()) as JSType // string

    return type
}

export const createFileTree = (
    dirData: DirData,
    options?: {
        parentPath?: string
    },
) => {
    if (getDataType(dirData) !== 'object') return []

    const { parentPath = '' } = options ?? {}

    type FileTree = {
        type: 'file' | 'directory'
        title: string
        path: string
        key: string
        children?: FileTree[] // when directory
    }

    const fileTree: FileTree[] = []

    for (const [title, value] of Object.entries(dirData)) {
        const fullPath = parentPath ? `${parentPath}/${title}` : title

        const isObject = getDataType(value) === 'object'

        if (isObject) {
            const subTree = createFileTree(value as DirData, {
                parentPath: fullPath,
            })
            fileTree.push({
                type: 'directory',
                title,
                key: fullPath,
                path: fullPath,
                children: subTree,
            })
        } else {
            const path = value as string

            fileTree.push({
                type: 'file',
                title,
                key: path,
                path: path,
            })
        }
    }

    return fileTree
}

export const compressImg = (imgPath: string) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    img.src = imgPath
    img.onload = function () {
        // 图片原始尺寸
        const originWidth = (this as any).width
        const originHeight = (this as any).height
        // 最大尺寸限制
        const maxWidth = 400,
            maxHeight = 400
        // 目标尺寸
        let targetWidth = originWidth,
            targetHeight = originHeight
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
                targetWidth = maxWidth
                targetHeight = Math.round(
                    maxWidth * (originHeight / originWidth),
                )
            } else {
                targetHeight = maxHeight
                targetWidth = Math.round(
                    maxHeight * (originWidth / originHeight),
                )
            }
        }

        // canvas对图片进行缩放
        canvas.width = targetWidth
        canvas.height = targetHeight
        // 清除画布
        context?.clearRect(0, 0, targetWidth, targetHeight)
        // 图片压缩
        context?.drawImage(img, 0, 0, targetWidth, targetHeight)
    }
}

/**
 * 延迟执行代码以确保最小延迟时间的函数。
 *
 * @param {number} startTime - 函数执行的开始时间（以毫秒为单位）。
 * @param {number} endTime - 函数执行的结束时间（以毫秒为单位）。
 * @param {number} minDelayTime - 最小延迟时间（以毫秒为单位）。
 * @return {Promise<void>}
 */
export async function minDelayTime(
    startTime = Date.now(),
    endTime = Date.now(),
    minDelayTime = 500,
) {
    if (endTime - startTime < minDelayTime) {
        await delay(minDelayTime - (endTime - startTime))
    }

    return
}

export const get404Md = async () => {
    return request('/article/404.md').then((res) => {
        const { data, success } = res

        if (!success || !data) {
            return '# 404'
        }

        return data as string
    })
}
