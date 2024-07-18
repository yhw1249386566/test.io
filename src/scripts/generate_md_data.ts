// 此文件暂时无用

import fs from 'fs'
import path from 'path'

// 递归读取文件夹下的指定的所有文件
export default function readMdFiles(
    dir: string,
    options?: {
        fileSuffix?: string
    },
) {
    const files = fs.readdirSync(dir)
    const { fileSuffix = 'none' } = options ?? {}

    const articleFiles: string[] = []

    files.forEach((file) => {
        const filePath = path.join(dir, file)
        const stats = fs.statSync(filePath)

        if (stats.isDirectory()) {
            // 如果是文件夹，则递归读取其内容
            const subMdFiles = readMdFiles(filePath)
            articleFiles.push(...subMdFiles)
        } else if (file.endsWith(fileSuffix)) {
            // 如果是后缀为 fileSuffix 的文件，则读取其内容
            const content = fs.readFileSync(filePath, 'utf-8')
            articleFiles.push(content)
        }
    })

    return articleFiles
}
module.exports = readMdFiles
