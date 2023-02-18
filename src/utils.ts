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
