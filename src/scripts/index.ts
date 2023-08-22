import fs from 'fs'
import path from 'path'

import generateArticleFolderStructure from './generate_article_folder_structure'

const articleDir = path.join(__dirname, '..', 'assets/article')

const folderStructure = generateArticleFolderStructure(articleDir)

// 写入数据到文件
fs.writeFileSync(
    './src/article_dir.js',
    `export default ${JSON.stringify(folderStructure)}`,
)
