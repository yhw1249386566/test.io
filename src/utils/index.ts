/* eslint-disable no-use-before-define */

import { getType } from '@yomua/y-screw'

import { ARTICLE_SUFFIX_NAME } from '@/utils/constant'

import { ArticleFileTree } from './utils.d'
import request from './request'

/** start --- 不需要导出 --- start */
type ArticleDirData = {
    [fileName: string]: string | ArticleDirData
}

/** end --- 不需要导出 --- end */

export const delay = async (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time))

export const invertColor = (color: string) => {
    const colorValue: any = '0x' + color.replace(/#/g, '')
    const str = '000000' + (0xffffff - colorValue).toString(16)
    return '#' + str.substring(str.length - 6, str.length)
}

export const createFileTree = (
    dirData: ArticleDirData,
    options?: {
        parentPath?: string
    },
) => {
    if (getType(dirData) !== 'object') return []

    const { parentPath = '' } = options ?? {}

    const fileTree: ArticleFileTree[] = []

    for (const [title, value] of Object.entries(dirData)) {
        const fullPath = parentPath ? `${parentPath}/${title}` : title

        const isObject = getType(value) === 'object'

        if (isObject) {
            const subTree = createFileTree(value as ArticleDirData, {
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

// path => 1_front_end/0_base/JS设计模式/设计模式.md
// return => [ "1_front_end", "1_front_end/0_base", "1_front_end/0_base/JS设计模式"]
export function parseArticlePath(path: string) {
    // 移除以 / 开始且以 ARTICLE_SUFFIX_NAME 中的项 结尾的部分 (['.md']) => abc/a/xxx.md 保留 abc/a
    // => 1_front_end/0_base/JS设计模式
    ARTICLE_SUFFIX_NAME.forEach((suffix) => {
        if (!suffix) {
            return
        }

        const reg = new RegExp(`/[^/]+${suffix}$`)
        path = path.replace(reg, '')
    })

    const segments = path.split('/').filter(Boolean)

    const result: string[] = []

    let currentPath = ''

    // 遍历路径, 然后拼接, 最后得出
    // => [ "1_front_end", "1_front_end/0_base", "1_front_end/0_base/JS设计模式"]
    for (let i = 0; i < segments.length; i++) {
        if (i === 0) {
            currentPath += `${segments[i]}`
            result.push(currentPath)
        } else {
            currentPath += `/${segments[i]}`
            result.push(currentPath)
        }
    }

    return result
}

// 对数组每一个项进行遍历, 判断是否有一个满足字符串包含数组某项.
export function stringIncludesArray(str: string, arr: string[]) {
    return arr.some((item) => str.includes(item))
}
