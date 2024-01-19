import log from '@yomua/y-tlog'
import { execSync } from 'child_process'

import { getDate } from './utils'

export default function generateFileLastCommitDate(path: string) {
    try {
        // 执行 git log 命令获取最后一次提交的时间（UNIX 时间戳）
        const result = execSync(`git log -n 1 --format=%at -- ${path}`, {
            encoding: 'utf-8',
        })

        return getDate(parseInt(result.trim()) * 1000)
    } catch (error) {
        log.error('Error:', error)

        return getDate(Date.now())
    }
}
