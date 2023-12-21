import fs from 'fs'
import path from 'path'

// 递归获取文件夹结构
function generateArticleFolderStructure(
    dir: string, // 某个目录，如：/yomua/src/scripts/index.ts
    options?: {
        includeFile?: string[]
    },
) {
    const result = {}

    const files = fs.readdirSync(dir)

    files.forEach((file) => {
        const filePath = path.join(dir, file)
        const stats = fs.statSync(filePath)

        if (stats.isDirectory()) {
            // 如果是文件夹，则递归获取其子文件夹结构
            result[file] = generateArticleFolderStructure(filePath, {
                includeFile: ['.md'],
            })
        } else if (options?.includeFile?.find((eF) => file.includes(eF))) {
            // 如果是文件，则记录文件路径
            result[file] = filePath.replace(/\\/g, '/')
        }
    })

    return result
}

export default generateArticleFolderStructure
