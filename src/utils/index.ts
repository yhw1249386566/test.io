/* eslint-disable no-use-before-define */

import request from './request'
import { JSValueType } from './utils.d'

/** start --- 不需要导出 --- start */
type DirData = {
    [fileName: string]: string | DirData
}
/** end --- 不需要导出 --- end */

export const delay = async (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time))

export const invertColor = (color: string) => {
    const colorValue: any = '0x' + color.replace(/#/g, '')
    const str = '000000' + (0xffffff - colorValue).toString(16)
    return '#' + str.substring(str.length - 6, str.length)
}

export const getDataType = <T>(data: T): JSValueType => {
    const type = Object.prototype.toString
        .call(data)
        .replace(/\[?\]?/g, '') // 'object String'
        .replace('object ', '') // String
        .replace(/\w/, (r) => r.toLowerCase()) as JSValueType // string

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

// 更新页面 URL 地址, 并在需要时触发 'popstate' 事件。
export const urlChange = (
    url: string,
    options?: {
        state?: any // 当使用者监听 popstate 时，要传给 event.state 的数据
        go?: boolean // 修改 url 时是否直接跳转过去
    },
) => {
    const { go = false, state = null } = options ?? {}

    window.history.replaceState(null, '', url)

    if (go) {
        const popStateEvent = new PopStateEvent('popstate', { state })

        window.dispatchEvent(popStateEvent)
    }
}
