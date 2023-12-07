import fs from 'fs'
import path from 'path'

import generateArticleFolderStructure from './generate_article_folder_structure'
import generateImg from './generate_img'

// __dirname: 当前此文件夹所在路径, 比如: D:\code\yomua\src\scripts
const articleDir = path.join(__dirname, '../../public', '/article')

const folderStructure = generateArticleFolderStructure(articleDir)

// 写入数据到文件
fs.writeFileSync(
    './src/article_dir.js',
    `export default ${JSON.stringify(folderStructure)}`,
)

// 开始递归遍历 articleDir, 得到所有 picture 目录下的图像，然后根据名字同步复制到目标目录
generateImg(articleDir, path.join(__dirname, '../../public', 'picture'), {
    files: ['.jpg', '.png', '.gif'],
})
