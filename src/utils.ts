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

export const delay = async (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time))

export const equal = (a: string | number, b: string | number) => {
    if (a === b) {
        return true
    }
    return false
}

export const invertColor = (color: string) => {
    const colorValue: any = '0x' + color.replace(/#/g, '')
    const str = '000000' + (0xffffff - colorValue).toString(16)
    return '#' + str.substring(str.length - 6, str.length)
}

export const saveLocalStorage = (
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

export const getLocalStorage = (key: string) => {
    if (!key) {
        console.error('getLocalStorage: key 不存在')
        return
    }

    return localStorage.getItem(key)
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
