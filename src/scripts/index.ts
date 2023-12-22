import fs from 'fs'
import path from 'path'
import Dotenv from 'dotenv'

import {
    ARTICLE_DIR,
    WRITE_ARTICLE_DIR,
    ARTICLE_PICtURE,
    ARTICLE_SUFFIX_NAME,
} from '../utils/constant'

import generateImg from './generate_img'
import generateArticleFolderStructure from './generate_article_folder_structure'

// __dirname: 当前此文件夹所在路径, 比如: D:\code\yomua\src\scripts

// => / or
// => D:\code\yomua
const currentWorkingDir = process.cwd()

// 文章所处目录
const articleDir = path.join(currentWorkingDir, ARTICLE_DIR)

// 写入文章图片的目录
const articlePictureDir = path.join(currentWorkingDir, ARTICLE_PICtURE)

const folderStructure = generateArticleFolderStructure(articleDir, {
    includeFiles: [ARTICLE_SUFFIX_NAME],
})

// 写入数据到文件
fs.writeFileSync(
    WRITE_ARTICLE_DIR,
    `export default ${JSON.stringify(folderStructure)}`,
)

// 开始递归遍历 articleDir, 得到所有 picture 目录下的图像，然后根据名字同步复制到目标目录
generateImg(articleDir, articlePictureDir)
