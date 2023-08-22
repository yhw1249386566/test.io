import fs from 'fs'
import path from 'path'

// 递归读取文件夹下的所有 .md 文件
export default function readMdFiles(dir) {
    const files = fs.readdirSync(dir)

    const mdFiles: string[] = []

    files.forEach((file) => {
        const filePath = path.join(dir, file)
        const stats = fs.statSync(filePath)

        if (stats.isDirectory()) {
            // 如果是文件夹，则递归读取其内容
            const subMdFiles = readMdFiles(filePath)
            mdFiles.push(...subMdFiles)
        } else if (file.endsWith('.md')) {
            // 如果是 .md 文件，则读取其内容
            const content = fs.readFileSync(filePath, 'utf-8')
            mdFiles.push(content)
        }
    })

    return mdFiles
}
module.exports = readMdFiles
