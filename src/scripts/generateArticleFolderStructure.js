// getFolderStructure.js
const fs = require('fs')
const path = require('path')

// 递归获取文件夹结构
function getFolderStructure(dir) {
    const result = {}

    const files = fs.readdirSync(dir)

    files.forEach((file) => {
        const filePath = path.join(dir, file)
        const stats = fs.statSync(filePath)

        if (stats.isDirectory()) {
            // 如果是文件夹，则递归获取其子文件夹结构
            result[file] = getFolderStructure(filePath)
        } else {
            // 如果是文件，则记录文件路径
            result[file] = filePath
        }
    })

    return result
}

module.exports = getFolderStructure
