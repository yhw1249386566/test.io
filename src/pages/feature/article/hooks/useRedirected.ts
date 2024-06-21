/* eslint-disable no-useless-escape */

import { useEffect } from 'react'
import { urlChange } from '@yomua/y-screw'
import log from '@yomua/y-tlog'

import request from '@/utils/request'
import storage from '@/utils/storage'
import { get404Md, parseArticlePath, stringIncludesArray } from '@/utils'
import { DEFAULT_EXPANDED_KEYS } from '@/pages/constant'
import { LOCAL_STORAGE_NAME, ARTICLE_SUFFIX_NAME } from '@/utils/constant'

import { Action } from '../types.d'

// 处理重定向
export default function useRedirected(
    dispatch: React.Dispatch<Action>,
    dep?: React.DependencyList,
) {
    useEffect(() => {
        const url = new URL(window.location.href)
        const urlParams = new URLSearchParams(url.search)

        if (urlParams.get('redirected') !== 'true') {
            return
        }

        // 设置相关 state 数据
        // 设置相关数据到 local storage
        // 更改 url: 显示更为友好的 url 地址
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
                if (
                    !stringIncludesArray(
                        filePathRemoveFeature,
                        ARTICLE_SUFFIX_NAME,
                    )
                ) {
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
                    ? // 跳转过来的文章路径的父目录 + 本地已存储的展开目录
                      [...new Set([...parseKeys, ...localExpandKeys])]
                    : [
                          // 跳转过来的文章路径 + 其父目录 + 默认需要展开的目录
                          ...new Set([
                              expandKey,
                              ...parseKeys,
                              ...DEFAULT_EXPANDED_KEYS,
                          ]),
                      ]
                // 更改 url 为更友好显示的地址
                urlChange(`${url.origin}${pathname}${url.hash}`)

                dispatch({
                    type: 'setMarkdownData',
                    payload: data,
                })

                dispatch({
                    type: 'setSelectedKey',
                    payload: selectedArticleKey,
                })

                dispatch({
                    type: 'setExpandedKeys',
                    payload: keys,
                })

                storage.saveBatchLocalStorage([
                    {
                        key: LOCAL_STORAGE_NAME.ARTICLE_TREE_EXPANDED_KEYS,
                        value: JSON.stringify(keys),
                    },
                    {
                        key: LOCAL_STORAGE_NAME.SELECTED_ARTICLE_KEY,
                        value: selectedArticleKey,
                    },
                ])
            } catch (error) {
                log.error(error)

                urlChange(`${url.origin}/feature/article`)

                get404Md().then((res) =>
                    dispatch({ type: 'setMarkdownData', payload: res }),
                )
            }
        }

        getArticle()
    }, dep)
}
