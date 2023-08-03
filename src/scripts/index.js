const fs = require('fs')
const path = require('path')
const generateArticleFolderStructure = require('./generateArticleFolderStructure')

const articleDir = path.join(__dirname, '..', 'article')

const folderStructure = generateArticleFolderStructure(articleDir) // 替换为正确的文件夹路径

console.log('结构: ', JSON.stringify(folderStructure, null, 2))

// 写入数据到文件
fs.writeFileSync(
    './src/articleData.js',
    `export default ${JSON.stringify(folderStructure)}`,
)
