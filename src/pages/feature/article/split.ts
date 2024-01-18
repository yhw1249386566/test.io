/* eslint-disable no-useless-escape */

import { useEffect } from 'react'
import { urlChange } from '@yomua/y-screw'
import log from '@yomua/y-tlog'

import request from '@/utils/request'
import storage from '@/utils/storage'
import { get404Md } from '@/utils'
import { DEFAULT_EXPANDED_KEYS } from '@/pages/constant'
import { LOCAL_STORAGE_NAME, ARTICLE_SUFFIX_NAME } from '@/utils/constant'

// 简单拆分一下 article 逻辑

// path => 1_front_end/0_base/JS设计模式/设计模式.md
// return => [ "1_front_end", "1_front_end/0_base", "1_front_end/0_base/JS设计模式"]
function parseArticlePath(path: string) {
    // 移除以 / 开始且以 .md 结尾的部分 => abc/a/xxx.md 保留 abc/a
    // => 1_front_end/0_base/JS设计模式
    const reg = new RegExp(`\/[^/]+\.${ARTICLE_SUFFIX_NAME}$`)

    path = path.replace(reg, '')

    const segments = path.split('/').filter(Boolean)

    const result: string[] = []

    let currentPath = ''

    // 遍历路径, 然后拼接, 最后得出
    // => [ "1_front_end", "1_front_end/0_base", "1_front_end/0_base/JS设计模式"]
    for (let i = 0; i < segments.length; i++) {
        if (i === 0) {
            currentPath += `${segments[i]}`
            result.push(currentPath)
        } else {
            currentPath += `/${segments[i]}`
            result.push(currentPath)
        }
    }

    return result
}

// 处理重定向
export function useRedirected(
    action: {
        setMarkdownData: (markdown: string) => void
        setSelectedKey: (key: string) => void
        setExpandedKeys: (keys: string[]) => void
    },
    dep?: React.DependencyList,
) {
    const { setMarkdownData, setSelectedKey, setExpandedKeys } = action

    useEffect(() => {
        const url = new URL(window.location.href)
        const urlParams = new URLSearchParams(url.search)

        if (urlParams.get('redirected') !== 'true') {
            return
        }

        async function getArticle() {
            // 只有当 try...catch 没有运行完毕时, 才能捕获错误;
            // 所以对于使用 await promise 这样语法代码来说, 相当于 try...catch 再运行期间就能捕获 promise 中的错误
            // 所以 try...catch 能有效捕获到 await promise 的错误
            try {
                const pathname = urlParams.get('pathname') ?? ''

                // => /home/runner/work/yomua/yomua/public/article/xxx.md
                // => D:/code/yomua/public/article/xxx.md
                // 这里不包含 ARTICLE_SUFFIX_NAME 也没关系, 大不了设置 selectedKey 失败
                // 实际上, 我们根本没办法确定根路径是什么, 除非设置默认值为 /home/runner/work/yomua/yomua/public/article
                // 但是这并不通用, 换一个服务器, 可能就有问题了.
                const selectedArticleKey =
                    urlParams.get('selectedArticleKey') ?? ''

                // 去除 feature, 因为我们将文章放在 public/article
                // => /article/xxx.md
                const filePathRemoveFeature = pathname.replace('/feature', '')

                // 防止跳转过来的页面没有 ARTICLE_SUFFIX_NAME
                if (!filePathRemoveFeature.includes(ARTICLE_SUFFIX_NAME)) {
                    throw new Error(
                        `filePathRemoveFeature: is not a ${ARTICLE_SUFFIX_NAME} file`,
                    )
                }

                const { success, data } = await request(filePathRemoveFeature)

                if (!success || !data) {
                    throw new Error('Can not get data')
                }

                // 截取从 /article/ 之后的路径
                // => 1_front_end/c_javascript/AJAX/AJAX.md
                const filePath = filePathRemoveFeature.replace('/article/', '')

                // 截取从 0 到最后一个 /, 截掉 /xxx.md
                //  => 1_front_end/c_javascript/AJAX
                const expandKey = filePath.slice(0, filePath.lastIndexOf('/'))

                // 取出本地存储的 expandKeys
                const localExpandKeys = storage.getLocalStorage(
                    LOCAL_STORAGE_NAME.ARTICLE_TREE_EXPANDED_KEYS,
                    {
                        returnType: 'array',
                    },
                )

                // 若跳转过来的文章路径, 它的目录没有被展开,
                // 则通过此方法解析它的所有父目录, 然后依次展开
                const parseKeys = parseArticlePath(filePath)

                const keys = localExpandKeys
                    ? [...new Set([...parseKeys, ...localExpandKeys])]
                    : [
                          ...new Set([
                              expandKey,
                              ...parseKeys,
                              ...DEFAULT_EXPANDED_KEYS,
                          ]),
                      ]

                // 更改 url 为更友好显示的地址
                urlChange(`${url.origin}${pathname}${url.hash}`)

                setMarkdownData(data)

                setSelectedKey(selectedArticleKey)

                setExpandedKeys(keys)

                storage.saveBatchLocalStorage([
                    {
                        key: LOCAL_STORAGE_NAME.ARTICLE_TREE_EXPANDED_KEYS,
                        value: JSON.stringify(keys),
                    },
                    {
                        key: LOCAL_STORAGE_NAME.SELECTED_ARTICLE_KEY,
                        value: selectedArticleKey,
                    },
                    {
                        key: LOCAL_STORAGE_NAME.ARTICLE_FILE_PATH,
                        value: filePathRemoveFeature, // 保留 /article/
                    },
                ])
            } catch (error) {
                log.error(error)

                urlChange(`${url.origin}/feature/article`)

                get404Md().then((res) => setMarkdownData(res))
            }
        }

        getArticle()
    }, dep)
}
