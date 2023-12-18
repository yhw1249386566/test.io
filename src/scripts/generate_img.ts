import fs from 'fs'
import path from 'path'
import fse from 'fs-extra'

// 递归遍历目录
function generateImg(
    directory: string,
    targetDir: string,
    options?: {
        files?: string[]
    },
) {
    const { files = ['.jpg', '.png', '.gif'] } = options ?? {}

    const filesDir = fs.readdirSync(directory)

    filesDir.forEach((file) => {
        const filePath = path.join(directory, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
            // 如果是目录，递归遍历
            generateImg(filePath, targetDir, options)
        } else {
            // 如果是文件且在 picture 目录下且是图片文件，则复制到目标目录
            const isPictureFile = files.includes(`.${file.split('.')[1]}`)

            if (isPictureFile) {
                const targetPath = path.join(targetDir, file)
                // 将 filePath, 如：\public\article\0_base\MVC和MVVM和MVP架构\picture\Baidu-MVCabstract.png
                // 同步复制到目标目录 \public\picture

                // 后片可以添加一个文件名如果存在，就添加一个 hash / uuid 后缀这种。
                fse.copySync(filePath, targetPath)
            }
        }
    })
}

export default generateImg
