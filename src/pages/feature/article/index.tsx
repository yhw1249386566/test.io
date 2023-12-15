import { memo, useMemo, useCallback, useState, useEffect } from 'react'
import { Tree, Skeleton } from 'antd'

import IndexedDB from '~/packages/y-indexeddb'
import classnames from '~/packages/y-classnames'
import EventEmitter from '~/packages/y-eventmitter'

import { useTheme } from '@/hooks'
import { Markdown } from '@/component'
import request from '@/utils/request'
import articleDir from '@/article_dir.js'
import { EVENT_EMITTER_NAME } from '@/utils/constant'
import { DEFAULT_EXPANDED_KEYS } from '@/pages/constant'
import { delay, createFileTree, storage } from '@/utils'

import style from './index.less'
import './index.less' // 如果需要使用 'article-markdown'(不用 style.xxx)，就需要这样导入

const { DirectoryTree } = Tree

function Article() {
    const theme = useTheme()

    const [markdownData, setMarkdownData] = useState('')

    const [prevSelectedFilePath, setPrevSelectedFilePath] = useState('')

    const [isOpenDirectoryOnlyArticle, setIsOpenDirectoryOnlyArticle] =
        useState(false)

    const fileTree = useMemo(() => createFileTree(articleDir), [articleDir])

    const isHaveSkeleton = useMemo(
        () => storage.getLocalStorage('activeFilePath') && !markdownData, // 有 path 但没有 markdownData, 说明正在获取数据
        [markdownData],
    )

    const get404Md = useCallback(async () => {
        request('/article/404.md').then((res) => {
            const { data, success } = res

            if (!success || !data) {
                setMarkdownData('# 404')
                return
            }

            setMarkdownData(data)

            // 保留最后一次点击的文件数据
            IndexedDB.singleInstance.clearDataFromStore()
            IndexedDB.singleInstance.updateDataFromStore(
                '/article/404.md',
                data,
            )
        })
    }, [])

    const handleTreeSelect = useCallback(
        async (
            path: string[],
            info: { node: { type: 'file' | 'directory' } },
        ) => {
            const activePath = path?.[0] ?? ''

            // 点击文件夹或者文件名都会触发 onSelect 和 onExpand，它们一起触发的
            // 所以当点击文件夹时，onSelect 也会触发，导致动态导入文件出错。
            if (
                !activePath ||
                info?.node?.type !== 'file' ||
                prevSelectedFilePath === activePath
            ) {
                return
            }

            setPrevSelectedFilePath(activePath)
            storage.saveLocalStorage({
                key: 'activeFilePath',
                value: activePath,
            })

            const importFilePath = (activePath as string)
                ?.split('article')[1]
                ?.replaceAll('\\', '/') // 最后得到例如: '/css/缓存.md', fetch 不需要担心 import() 的情况，即: 必须包含一些路径信息。

            // 通过 fetch 获取根目录下的 article.
            // 不通过 import(): import() 会造成按需加载时，将每一个动态导入的 .md 文件视为一个路由，从而在 build 后多一个拆分的 js 文件
            request(`/article${importFilePath}`).then((res) => {
                const { data, success } = res

                if (!success || !data) {
                    get404Md()
                    if (isOpenDirectoryOnlyArticle) {
                        EventEmitter.singleInstance.emit(
                            EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY,
                            {
                                isShowX: false,
                            },
                        )
                    }
                    return
                }

                setMarkdownData(data)

                // 保留最后一次点击的文件数据
                IndexedDB.singleInstance.clearDataFromStore()
                IndexedDB.singleInstance.updateDataFromStore(activePath, data)

                // 仅显示文章时，若打开了所有文章目录，选中一个文章时，会直接切换到文章。
                // why 使用 emit: Header 也监听了此事件, 当点击所有文章目录时，将 X（打 X 按钮）切换到 bars
                if (isOpenDirectoryOnlyArticle) {
                    EventEmitter.singleInstance.emit(
                        EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY,
                        {
                            isShowX: false,
                        },
                    )
                }
            })
        },
        [prevSelectedFilePath, isOpenDirectoryOnlyArticle],
    )

    // 刷新/切换路由，然后再点进来时，加载最后一次点击的目录的文件数据
    useEffect(() => {
        const filepath = storage.getLocalStorage('activeFilePath')

        if (!filepath) {
            get404Md()
            return
        }

        const startTime = Date.now()

        async function getArticleDataFromStore() {
            const req = IndexedDB.singleInstance.getDataFromStore(filepath)
            req.onsuccess = async (event: any) => {
                const result: { filepath: string; file: string } =
                    event?.target?.result

                const endTime = Date.now()

                // 由于拿 IndexedDB 数据需要时间，但是时间又太短（几十毫秒）
                // 所以为了给用户良好的体验（不要一闪而过），给 loading 加至少总共要延迟 500ms
                if (endTime - startTime < 500) {
                    await delay(500 - (endTime - startTime))
                }

                if (!result) {
                    get404Md()
                    return
                }

                setMarkdownData(result?.file ?? '')
            }
        }

        getArticleDataFromStore()
    }, [])

    // 监听 Header - 打开菜单按钮点击事件
    useEffect(() => {
        EventEmitter.singleInstance.on(
            EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY,
            () => {
                setIsOpenDirectoryOnlyArticle(!isOpenDirectoryOnlyArticle)
            },
        )

        // 这里不需要移除此事件，将在 Header 中移除
        // 因为对于 EventEmitter3 来说，移除一个事件，相当于移除监听它的所有事件处理器
        // 所以，只需要在 Header 中移除就好，否则这里移除了，Header 中监听此事件的事件处理器将失效。
        // return () => {
        //     EventEmitter.singleInstance.off(
        //         EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY,
        //     )
        // }
    }, [isOpenDirectoryOnlyArticle])

    return (
        <div
            className={classnames(style.article, {
                [style[`article-${theme}`]]: theme,
            })}>
            <div
                className={classnames(style.directoryTreeBox, {
                    [style.showDirectorOnlyArticle]: isOpenDirectoryOnlyArticle,
                })}>
                <DirectoryTree
                    className={style.directoryTree}
                    treeData={fileTree as any[]}
                    onSelect={handleTreeSelect as any}
                    defaultExpandedKeys={DEFAULT_EXPANDED_KEYS}
                />
            </div>

            {isHaveSkeleton && (
                <Skeleton
                    active
                    className={style.skeleton}
                    paragraph={{ rows: 20 }}
                />
            )}

            {markdownData && (
                <Markdown
                    className={classnames(style.markdown, 'article-markdown', {
                        [style.hideMarkdownOnlyArticle]:
                            isOpenDirectoryOnlyArticle,
                    })}>
                    {markdownData}
                </Markdown>
            )}
        </div>
    )
}

export default memo(Article)
