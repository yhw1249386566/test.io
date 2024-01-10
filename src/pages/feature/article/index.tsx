/* eslint-disable no-useless-escape */

import { memo, useMemo, useCallback, useState, useEffect } from 'react'
import { Tree, Skeleton } from 'antd'
import { SkeletonParagraphProps } from 'antd/lib/skeleton/paragraph'
import MarkNavbar from 'markdown-navbar'
import classnames from '@yomua/y-classnames'
import { urlChange } from '~/packages/y-screw'
import EventEmitter from '@yomua/y-eventemitter'

import log from '@/utils/log'
import { useTheme } from '@/hooks'
import request from '@/utils/request'
import storage from '@/utils/storage'
import { Markdown } from '@/component'
import articleDir from '@/article_dir.js'
import { DEFAULT_EXPANDED_KEYS } from '@/pages/constant'
import { createFileTree, minDelayTime, get404Md } from '@/utils'
import {
    EVENT_EMITTER_NAME,
    LOCAL_STORAGE_NAME,
    ARTICLE_SUFFIX_NAME,
} from '@/utils/constant'

import './markNavbar.css'
import style from './index.less'
import { useRedirected } from './split'

const { DirectoryTree } = Tree

const PARAGRAPH: SkeletonParagraphProps = { rows: 20 }

function Article() {
    const theme = useTheme()

    const [articleLoading, setArticleLoading] = useState(false)

    const [markdownData, setMarkdownData] = useState('')

    // 如果重复点击一样的目录, 则不再重新加载数据
    const [prevSelectedFilePath, setPrevSelectedFilePath] = useState('')

    const [isOpenDirectoryOnlyArticle, setIsOpenDirectoryOnlyArticle] =
        useState(false)

    const [expandedKeys, setExpandedKeys] = useState(DEFAULT_EXPANDED_KEYS)

    // 点击 .md 文件 =>  D:/code/yomua/public/article/0_base/函数式编程/函数式编程.md
    const [selectedKey, setSelectedKey] = useState('')

    const fileTree = useMemo(() => createFileTree(articleDir), [articleDir])

    // 有 article path 但没有 markdownData, 说明正在获取数据, 或 loading 为 true
    const isHaveSkeleton = useMemo(
        () =>
            (storage.getLocalStorage(LOCAL_STORAGE_NAME.ARTICLE_FILE_PATH) &&
                !markdownData) ||
            articleLoading,
        [markdownData, articleLoading],
    )

    // 是否为从 public/404.html 重定向过来
    const isRedirected = window.location?.search?.includes('redirected=true')

    // 点击文件夹或者文件名会触发 onSelect 和 onExpand
    const handleTreeSelect = useCallback(
        async (
            path: string[],
            info: { node: { type: 'file' | 'directory' } },
        ) => {
            // 若点击文件夹: 0_base/优秀的编程方式
            // 若点击 md 文件: D:/code/yomua/public/article/0_base/函数式编程/函数式编程.md
            const activePath = path?.[0] ?? ''

            if (
                !activePath ||
                info?.node?.type !== 'file' ||
                prevSelectedFilePath === activePath
            ) {
                return
            }

            // 点击的是文章: 存储并设置最后一次文章 key; 每次点击都认为是最后一次
            if (activePath.includes(ARTICLE_SUFFIX_NAME)) {
                // => D:/code/yomua/public/article/xxx.md
                storage.saveLocalStorage({
                    key: LOCAL_STORAGE_NAME.SELECTED_ARTICLE_KEY,
                    value: activePath,
                })
                setSelectedKey(activePath)
            }

            setPrevSelectedFilePath(activePath)

            // => /article/*.md
            const importFilePath = activePath.slice(
                activePath.indexOf('/article'),
            )

            urlChange(window.location.origin + `/feature${importFilePath}`)

            // 切换文章时, 默认滚动到顶部
            window.scrollTo(0, 0)

            // 点击文章或目录: 把此次点击认做是最后一次点击的文件路径 =>/article/xxx.md
            storage.saveLocalStorage({
                key: LOCAL_STORAGE_NAME.ARTICLE_FILE_PATH,
                value: importFilePath,
            })

            // 仅显示文章, 且此时打开了所有文章目录时
            // 当选中某个目录时，将 X（打 X 按钮）切换到 bars, 并切换到文章.
            if (isOpenDirectoryOnlyArticle) {
                EventEmitter.emit(EVENT_EMITTER_NAME.SHOW_HEADER_X, false)

                EventEmitter.emit(EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY)
            }

            setArticleLoading(true)

            const startTime = Date.now()

            // 通过 fetch 获取根目录下的 article.
            // 不使用 import(): import() 会造成按需加载时，将每一个动态导入的 .md 文件视为一个路由，从而在 build 后多一个拆分的 js 文件
            request(importFilePath)
                .then(async (res) => {
                    const endTime = Date.now()

                    // 防止因为获取数据太快导致 loading 一闪而快, 所以加一个最小延迟 500 ms.
                    await minDelayTime(startTime, endTime)

                    const { data, success } = res

                    if (!success || !data) {
                        throw new Error('handleTreeSelect: Can not get data')
                    }

                    // 将 setArticleLoading(false) 放到 setMarkdownData 后面 -> 先设置数据，再取消 loading;
                    // 否则, 就会看见数据还未 set， 但是 loading 已经取消了, 最后数据再被设置, 从而造成画面闪烁.
                    setMarkdownData(data)
                    setArticleLoading(false)
                })
                .catch((error) => {
                    log.error('handleTreeSelect error', error)

                    get404Md()
                        .then((result) => setMarkdownData(result))
                        .finally(() => setArticleLoading(false))
                })
        },
        [prevSelectedFilePath, isOpenDirectoryOnlyArticle],
    )

    const handleTreeExpand = useCallback((expandKeys: string[]) => {
        storage.saveLocalStorage({
            key: LOCAL_STORAGE_NAME.ARTICLE_TREE_EXPANDED_KEYS,
            value: JSON.stringify(expandKeys),
        })

        setExpandedKeys(expandKeys)
    }, [])

    // 如果 queryString 包含 redirected=true, 则此 hook 触发.
    useRedirected(
        {
            setMarkdownData,
            setSelectedKey,
            setExpandedKeys,
        },
        [],
    )

    /**
     * 刷新/切换路由，然后再点进来时，加载最后一次点击的目录的文件数据
     * 注意: 启动本地服务, 不会走 public/404.html, 并且类似 URL: /feature/article/xx.md 是可以获取数据的.
     * why? 可能是本地启动服务数据加载不一样吧; 如果先打包(yarn build), 然后将打包文件放入服务器(http-server dist)
     * 这样再访问 /feature/article/xx.md 就没有问题, 会走 public/404.html
     */
    useEffect(() => {
        if (isRedirected) {
            return
        }

        const filepath = storage.getLocalStorage(
            LOCAL_STORAGE_NAME.ARTICLE_FILE_PATH,
        )

        urlChange(
            `${window.location.origin}/feature${filepath}${window.location.hash}`,
        )

        if (!filepath || !filepath.includes(ARTICLE_SUFFIX_NAME)) {
            urlChange(`${window.location.origin}/feature/article`)

            get404Md().then((result) => setMarkdownData(result))

            return
        }

        const startTime = Date.now()

        setArticleLoading(true)

        request(filepath)
            .then(async (res) => {
                const endTime = Date.now()

                await minDelayTime(startTime, endTime)

                const { data, success } = res

                if (!success || !data) {
                    throw new Error(
                        'initFileDataWhenFirstLoad: Can not get data',
                    )
                }

                // 先设置数据再取消 loading
                setMarkdownData(data)
                setArticleLoading(false)
            })
            .catch((error) => {
                log.group('initFileDataWhenFirstLoad error', {
                    sub: [
                        {
                            type: 'error',
                            message: error,
                        },

                        {
                            type: 'log',
                            message: `filepath: ${filepath}`,
                        },
                    ],
                })

                // 如果的错误被执行, 说明第一次进来就出错了, 这很严重, 所以放弃所有本地存储, 重新再存储.
                storage.clearAllLocalStorage()

                get404Md()
                    .then((result) => setMarkdownData(result))
                    .finally(() => setArticleLoading(false))
            })
    }, [])

    // 从 localStorage, 加载用户自定义展开的所有文章目录结构（若没有则使用默认目录）;
    // 且高亮显示最后一次用户选中的文章（若有）
    useEffect(() => {
        if (isRedirected) {
            return
        }

        const localExpandedKeys = storage.getLocalStorage(
            LOCAL_STORAGE_NAME.ARTICLE_TREE_EXPANDED_KEYS,
            {
                returnType: 'array',
            },
        )

        const localSelectedArticleKey = storage.getLocalStorage(
            LOCAL_STORAGE_NAME.SELECTED_ARTICLE_KEY,
        )

        localSelectedArticleKey && setSelectedKey(localSelectedArticleKey)

        localExpandedKeys && setExpandedKeys(localExpandedKeys)
    }, [])

    // 监听 Header - 打开菜单按钮点击事件; 用来控制 显示/隐藏 所有文章目录
    useEffect(() => {
        EventEmitter.on(EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY, () => {
            setIsOpenDirectoryOnlyArticle(!isOpenDirectoryOnlyArticle)
        })

        return () => {
            EventEmitter.off(EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY)
        }
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
                    treeData={(fileTree as any[]) || []}
                    expandedKeys={expandedKeys}
                    onExpand={handleTreeExpand as any}
                    selectedKeys={[selectedKey]}
                    onSelect={handleTreeSelect as any}
                />
            </div>

            <Skeleton
                active
                paragraph={PARAGRAPH}
                loading={isHaveSkeleton}
                className={style.skeleton}>
                <Markdown
                    className={classnames(style.markdown, {
                        [style.hideMarkdownOnlyArticle]:
                            isOpenDirectoryOnlyArticle,
                    })}>
                    {markdownData}
                </Markdown>
            </Skeleton>

            <div className={style.markNavbarBox}>
                <MarkNavbar
                    ordered={false}
                    headingTopOffset={40}
                    source={isHaveSkeleton ? '' : markdownData}
                />
            </div>
        </div>
    )
}

export default memo(Article)
