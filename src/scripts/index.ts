import fs from 'fs'
import path from 'path'

import {
    ARTICLE_DIR,
    WRITE_ARTICLE_DIR,
    ARTICLE_PICtURE,
    ARTICLE_SUFFIX_NAME,
} from '../utils/constant'

import { updateEnvFile } from './utils'
import generateImg from './generate_img'
import generateArticleFolderStructure from './generate_article_folder_structure'
import generateFileLastCommitDate from './generate_file_last_commit_date'

// __dirname: 当前文件所处文件夹的所在路径, 比如: D:\code\yomua\src\scripts

// Node.js 进程的当前工作目录
// => D:\code\yomua
const currentWorkingDir = process.cwd()

// 文章所处目录
const articleDir = path.join(currentWorkingDir, ARTICLE_DIR)

// 写入文章图片的目录
const articlePictureDir = path.join(currentWorkingDir, ARTICLE_PICtURE)

// 生成文件目录树, 并认为此 ARTICLE_SUFFIX_NAME 后缀名的目录是文件
const folderStructure = generateArticleFolderStructure(articleDir, {
    includeFiles: [...ARTICLE_SUFFIX_NAME],
})

// 写入文章目录数据到指定路径的文件中
fs.writeFileSync(
    WRITE_ARTICLE_DIR,
    `export default ${JSON.stringify(folderStructure)}`,
)

// 开始递归遍历 articleDir, 得到所有 picture 目录下的图像，然后根据名字同步复制到目标目录
generateImg(articleDir, articlePictureDir)

// 更新 .env 文件中的 ARTICLE_COMMIT_LAST_DATE, 得到最新 public/article 目录的最后一次提交日期
updateEnvFile(
    path.join(currentWorkingDir, '.env'),
    generateFileLastCommitDate(articleDir),
)
