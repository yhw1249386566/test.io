import { memo, useMemo, useCallback, useState, useEffect } from 'react'
import { Tree, Skeleton } from 'antd'

import classnames from '~/packages/y-classnames'
import EventEmitter from '~/packages/y-eventmitter'

import { useTheme, useWindowEventListen } from '@/hooks'
import { Markdown } from '@/component'
import request from '@/utils/request'
import articleDir from '@/article_dir.js'
import { EVENT_EMITTER_NAME, LOCAL_STORAGE_NAME } from '@/utils/constant'
import { DEFAULT_EXPANDED_KEYS } from '@/pages/constant'
import { createFileTree, storage, minDelayTime, get404Md } from '@/utils'

import style from './index.less'
import './index.less' // 如果需要使用 'article-markdown'(不用 style.xxx)，就需要这样导入

const { DirectoryTree } = Tree

// path => /feature/article/1_front_end/0_base/JS设计模式/设计模式.md
function parseArticlePath(path: string) {
    // 移除 /feature/article
    // 移除以 / 开始且以 .md 结尾的部分 => /xxx.md
    path = path.replace(
        /^\/feature\/article\/([^\/]+\/[^\/]+\/[^\/]+)\/[^\/]+\.md$/,
        '$1',
    )

    const segments = path.split('/').filter(Boolean)

    const result: string[] = []

    let currentPath = ''

    // 遍历路径, 然后拼接
    // => [ "1_front_end", "1_front_end/0_base", "1_front_end/0_base/JS设计模式", "1_front_end/0_base/JS设计模式/设计模式.md" ]
    for (let i = 0; i < segments.length; i++) {
        if (i === 0) {
            currentPath += `${segments[i]}`
            result.push(currentPath)
        } else {
            currentPath += `/${segments[i]}`
            result.push(currentPath)
        }
    }

    // 去除 .md 的项
    return result.filter((key) => !key.includes('.md'))
}

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

    const isHaveSkeleton = useMemo(
        () =>
            (storage.getLocalStorage(LOCAL_STORAGE_NAME.ARTICLE_FILE_PATH) &&
                !markdownData) ||
            articleLoading, // 有 path 但没有 markdownData, 说明正在获取数据, 或 loading 为 true
        [markdownData, articleLoading],
    )

    const isShowMarkdown = useMemo(
        () => markdownData && !articleLoading, // 有 markdown 且 loading 为 false
        [markdownData, articleLoading],
    )
    // 点击文件夹或者文件名会触发 onSelect 和 onExpand
    const handleTreeSelect = useCallback(
        async (
            path: string[],
            info: { node: { type: 'file' | 'directory' } },
        ) => {
            // 例如:
            // 若点击文件夹: 0_base/优秀的编程方式
            // 若点击 md 文件: D:/code/yomua/public/article/0_base/函数式编程/函数式编程.md
            const activePath = path?.[0] ?? ''

            if (activePath.includes('.md')) {
                storage.saveLocalStorage({
                    key: LOCAL_STORAGE_NAME.SELECTED_ARTICLE_KEY,
                    value: activePath,
                })
                setSelectedKey(activePath)
            }

            if (
                !activePath ||
                info?.node?.type !== 'file' ||
                prevSelectedFilePath === activePath
            ) {
                return
            }

            setPrevSelectedFilePath(activePath)

            // 点击时, 把此次点击认做是最后一次点击的文件路径
            storage.saveLocalStorage({
                key: LOCAL_STORAGE_NAME.ARTICLE_FILE_PATH,
                value: activePath.slice(activePath.indexOf('/article')), // 例如: /article/xxx.md
            })

            const importFilePath = activePath.slice(
                activePath.indexOf('/article'),
            )

            // 仅显示文章, 且此时打开了所有文章目录时
            // 当选中某个目录时，将 X（打 X 按钮）切换到 bars, 并切换到文章.
            if (isOpenDirectoryOnlyArticle) {
                EventEmitter.singleInstance.emit(
                    EVENT_EMITTER_NAME.SHOW_HEADER_X,
                    false,
                )

                EventEmitter.singleInstance.emit(
                    EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY,
                )
            }

            setArticleLoading(true)
            const startTime = Date.now()

            // 通过 fetch 获取根目录下的 article.
            // 不通过 import(): import() 会造成按需加载时，将每一个动态导入的 .md 文件视为一个路由，从而在 build 后多一个拆分的 js 文件
            request(importFilePath).then(async (res) => {
                const endTime = Date.now()

                // 防止因为获取数据太快导致 loading 一闪而快, 所以加一个最小延迟 500 ms.
                await minDelayTime(startTime, endTime)

                const { data, success } = res

                if (!success || !data) {
                    const result = await get404Md()
                    setMarkdownData(result)
                    setArticleLoading(false)
                    return
                }

                // 将 setArticleLoading(false) 放到 setMarkdownData 后面 -> 先设置数据，再取消 loading;
                // 否则, 就会看见数据还未 set， 但是 loading 已经取消了, 最后数据再被设置, 从而造成画面闪烁.
                setMarkdownData(data)
                setArticleLoading(false)
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

    // 处理 github pages 因为 history 路由模式, 导致找不到页面
    // 根据用户指定的 feature/article/xxx.md, 从而找到对应的 .md 文件并显示
    useWindowEventListen(
        'popstate',
        async (event: { state: Location } | any) => {
            const url = event?.state as Location

            if (!url || !url.search.includes('redirected=true')) {
                return
            }

            const urlSearch = new URLSearchParams(url.search)

            // 替换成干净的网址
            history.replaceState(
                null,
                document.title,
                `${url.origin}/feature/article${url.hash}`,
            )

            const pathname = urlSearch.get('pathname') ?? ''

            // => /home/runner/work/yomua/yomua/public/article/xxx.md
            // => D:/code/yomua/public/article/xxx.md
            const selectedArticleKey = urlSearch.get('selectedArticleKey') ?? ''

            // 去除 feature, 因为我们将文章放在 public/article
            // => /article/xxx.md
            const articleFilePath = pathname.replace('/feature', '')

            const { data, success } = await request(articleFilePath)

            if (!success || !data) {
                const result = await get404Md()
                setMarkdownData(result)
                return
            }

            // 截取从 /article/ 之后的路径
            // => 1_front_end/c_javascript/AJAX/AJAX.md
            const articlePath = articleFilePath.replace('/article/', '')

            // 截取从 0 到最后一个 /, 截掉 /xxx.md
            //  => 1_front_end/c_javascript/AJAX
            const expandKey = articlePath.slice(0, articlePath.lastIndexOf('/'))

            // 取出本地存储的 expandKeys
            const localExpandKeys: string[] = storage.getLocalStorage(
                LOCAL_STORAGE_NAME.ARTICLE_TREE_EXPANDED_KEYS,
                {
                    returnType: 'array',
                },
            )

            // 若跳转过来的文章路径, 它的目录没有被展开,
            // 则通过此方法解析它的所有父目录, 然后依次展开
            const parseKeys = parseArticlePath(articlePath)

            const keys = localExpandKeys
                ? [...new Set([...parseKeys, ...localExpandKeys])]
                : [
                      ...new Set([
                          expandKey,
                          ...parseKeys,
                          ...DEFAULT_EXPANDED_KEYS,
                      ]),
                  ]

            setMarkdownData(data)

            setSelectedKey(selectedArticleKey)

            setExpandedKeys(keys)

            storage.saveLocalStorage({
                key: LOCAL_STORAGE_NAME.ARTICLE_TREE_EXPANDED_KEYS,
                value: JSON.stringify(keys),
            })

            // 将此次跳转过来的保存到 localStorage
            storage.saveLocalStorage({
                key: LOCAL_STORAGE_NAME.SELECTED_ARTICLE_KEY,
                value: selectedArticleKey,
            })
            storage.saveLocalStorage({
                key: LOCAL_STORAGE_NAME.ARTICLE_FILE_PATH,
                value: articleFilePath,
            })
        },
    )

    // 若是重定向过来的, 则再次重定向到 feature/article, 以便 umi 拦截, 然后使用正确的路由加载组件
    useEffect(() => {
        const url = new URL(window.location.href)
        const urlParams = new URLSearchParams(url.search)

        if (urlParams.get('redirected') !== 'true') {
            return
        }

        const popStateEvent = new PopStateEvent('popstate', {
            // 注意, URL 的实例是不能被展开运算符展开的 -> {...redirectedHrefData} 会得到 {}
            state: url,
        })

        window.dispatchEvent(popStateEvent)
    }, [])

    // 刷新/切换路由，然后再点进来时，加载最后一次点击的目录的文件数据
    useEffect(() => {
        if (window.location.search.includes('redirected=true')) {
            return
        }

        const filepath = storage.getLocalStorage(
            LOCAL_STORAGE_NAME.ARTICLE_FILE_PATH,
        )

        if (!filepath) {
            get404Md().then((result) => setMarkdownData(result))

            return
        }

        const startTime = Date.now()

        async function initFileDataWhenFirstLoad() {
            setArticleLoading(true)

            request(filepath).then(async (res) => {
                const endTime = Date.now()

                await minDelayTime(startTime, endTime)

                const { data, success } = res

                if (!success || !data) {
                    const result = await get404Md()
                    setMarkdownData(result)
                    setArticleLoading(false)
                    return
                }

                // 先设置数据再取消 loading
                setMarkdownData(data)
                setArticleLoading(false)
            })
        }

        initFileDataWhenFirstLoad()
    }, [])

    // 从 localStorage, 加载用户自定义展开的所有文章目录结构（若有, 否则使用默认目录 - 初始化已经做了）;
    // 且高亮显示最后一次用户选中的文章（若有）
    useEffect(() => {
        if (window.location.search.includes('redirected=true')) {
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

    // 监听 Header - 打开菜单按钮点击事件
    useEffect(() => {
        EventEmitter.singleInstance.on(
            EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY,
            () => {
                setIsOpenDirectoryOnlyArticle(!isOpenDirectoryOnlyArticle)
            },
        )

        return () => {
            EventEmitter.singleInstance.off(
                EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY,
            )
        }
    }, [isOpenDirectoryOnlyArticle])

    console.log('__selectedKey', selectedKey)

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
                    expandedKeys={expandedKeys}
                    onExpand={handleTreeExpand as any}
                    selectedKeys={[selectedKey]}
                    onSelect={handleTreeSelect as any}
                />
            </div>

            {isHaveSkeleton && (
                <Skeleton
                    active
                    className={style.skeleton}
                    paragraph={{ rows: 20 }}
                />
            )}

            {isShowMarkdown && (
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
