type DirData = {
    [fileName: string]: string | DirData
}

type JSType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'null'
    | 'undefined'
    | 'bigInt'
    | 'symbol'
    | 'object'
    | 'array'
    | 'function'

/** start --- 不需要导出 --- start */
const saveLocalStorage = (
    data: { key: string; value: string },
    // config?,
) => {
    const { key, value } = data

    if (!key) {
        console.error('saveLocalStorage: key 不存在')
        return
    }

    localStorage.setItem(key, value)
}

const getLocalStorage = (key: string) => {
    if (!key) {
        console.error('getLocalStorage: key 不存在')
        return ''
    }

    return localStorage.getItem(key) ?? ''
}

const saveSessionStorage = (
    data: { key: string; value: string },
    // config?,
) => {
    const { key, value } = data

    if (!key) {
        console.error('saveSessionStorage: key 不存在')
        return
    }

    sessionStorage.setItem(key, value)
}

const getSessionStorage = (key: string) => {
    if (!key) {
        console.error('getSessionStorage: key 不存在')
        return ''
    }

    return sessionStorage.getItem(key) ?? ''
}
/** end --- 不需要导出 --- end */

export const storage = {
    saveLocalStorage,
    getLocalStorage,
    saveSessionStorage,
    getSessionStorage,
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
        console.log(canvas.toDataURL('image/jpeg'))
    }
}
