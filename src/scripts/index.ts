import fs from 'fs'
import path from 'path'

import generateArticleFolderStructure from './generateArticleFolderStructure'

const articleDir = path.join(__dirname, '..', 'assets/article')

const folderStructure = generateArticleFolderStructure(articleDir) // 替换为正确的文件夹路径

// 写入数据到文件
fs.writeFileSync(
    './src/articleDir.js',
    `export default ${JSON.stringify(folderStructure)}`,
)
