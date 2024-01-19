import fs from 'fs'
import log from '@yomua/y-tlog'

export function getDate(ms: number): `${string}年${string}月${string}日` {
    // 将 UNIX 时间戳转换为日期对象
    const commitTime = new Date(ms)

    // 获取年、月、日
    const year = commitTime.getFullYear()
    const month = commitTime.getMonth() + 1 // 月份是从 0 开始的，需要加 1
    const day = commitTime.getDate()

    // 返回格式化后的日期字符串
    return `${year}年${month}月${day}日`
}

export function updateEnvFile(filePath: string, newDateValue: string) {
    try {
        // 读取 .env 文件内容
        let envContent = fs.readFileSync(filePath, 'utf-8')

        // 使用正则表达式匹配并替换 ARTICLE_COMMIT_LAST_DATE 的值
        envContent = envContent.replace(
            /(ARTICLE_COMMIT_LAST_DATE=)(.*)/,
            `$1${newDateValue}`,
        )

        // 将更新后的内容写回 .env 文件
        fs.writeFileSync(filePath, envContent, 'utf-8')
    } catch (error) {
        log.error('Error:', error)
    }
}
