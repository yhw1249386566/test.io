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
    config?,
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
