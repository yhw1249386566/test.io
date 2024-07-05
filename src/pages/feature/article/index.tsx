/* eslint-disable no-useless-escape */
import { memo, useCallback, useEffect, useReducer } from 'react'
import { createPortal } from 'react-dom'
import { Tree, Skeleton } from 'antd'
import { SkeletonParagraphProps } from 'antd/lib/skeleton/paragraph'
import MarkdownNavbar from '@/component/markdownNavbar'
import log from '@yomua/y-tlog'
import classnames from '@yomua/y-classnames'
import { urlChange } from '@yomua/y-screw'
import EventEmitter from '@yomua/y-eventemitter'
import { useWindowEventListener } from '@yomua/y-hooks'
import { useSelector, useDispatch } from '@yomua/y-simdux'

import { useTheme } from '@/hooks'
import request from '@/utils/request'
import storage from '@/utils/storage'
import { Markdown } from '@/component'
import articleDir from '@/article_dir.js'
import {
    createFileTree,
    minDelayTime,
    get404Md,
    stringIncludesArray,
} from '@/utils'
import {
    EVENT_NAME,
    LOCAL_STORAGE_NAME,
    ARTICLE_SUFFIX_NAME,
} from '@/utils/constant'

import { DEFAULT_EXPANDED_KEYS } from '@/pages/constant'

import './navbar.less'
import style from './index.less'
import SearchPanel from './SearchPanel'
import useRedirected from './hooks/useRedirected'
import reducer, { initialState } from './reducer'

const { DirectoryTree } = Tree

const PARAGRAPH: SkeletonParagraphProps = { rows: 20 }

const fileTree = createFileTree(articleDir)

function Article() {
    const theme = useTheme()

    // const dispatch = useDispatch()
    // const state = useSelector((state) => state)

    const [state, dispatch] = useReducer(reducer, initialState)

    // 是否为从 public/404.html 重定向过来 (要放到此组件中, 每次渲染此组件都需要判断)
    const isRedirected = window.location?.search?.includes('redirected=true')

    // 点击文件夹或者文件名会触发 onSelect 和 onExpand
    const handleTreeSelect = useCallback(
        async (
            path: string[], // 选中的文章路径 (在这里也就是每一个树的项对应的 key)
            info: { node: { type: 'file' | 'directory' } },
        ) => {
            // 若点击文件夹: 0_base/优秀的编程方式
            // 若点击 md 文件: D:/code/yomua/public/article/0_base/函数式编程/函数式编程.md
            const activePath = path?.[0] ?? ''

            if (
                !activePath ||
                info?.node?.type !== 'file' || // 点击非文件 (点击目录) 不进行计算
                state.prevSelectedFilePath === activePath // 重复点击不进行计算
            ) {
                return
            }

            // 选中的路路径后缀没有在 ARTICLE_SUFFIX_NAME 里面
            if (!stringIncludesArray(activePath, ARTICLE_SUFFIX_NAME)) {
                return
            }

            // 选中路径的后缀在 ARTICLE_SUFFIX_NAME 里面
            // => activePath: D:/code/yomua/public/article/xxx.md (D:/code/yomua/public 表示当前项目所在根路径)
            storage.saveLocalStorage({
                key: LOCAL_STORAGE_NAME.SELECTED_ARTICLE_KEY,
                value: activePath,
            })

            dispatch({ type: 'setSelectedKey', payload: activePath })

            dispatch({
                type: 'setPrevSelectedFilePath',
                payload: activePath,
            })

            // => /article/*.md
            const importFilePath = activePath.slice(
                activePath.indexOf('/article'),
            )

            urlChange(window.location.origin + `/feature${importFilePath}`)

            // 切换文章时, 默认滚动到顶部
            window.scrollTo(0, 0)

            // 仅显示文章, 且此时打开了所有文章目录时
            // 当选中某个目录时，将 X（打 X 按钮）切换到 bars, 并切换到文章.
            // 适配移动端
            if (state.isOpenDirectoryOnlyArticle) {
                EventEmitter.emit(EVENT_NAME.HEADER_MENU_ICON, 'bars')

                EventEmitter.emit(EVENT_NAME.OPEN_ARTICLE_DIRECTORY)
            }

            dispatch({ type: 'setArticleLoading', payload: true })

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
                    dispatch({
                        type: 'setMarkdownData',
                        payload: data,
                    })
                    dispatch({ type: 'setArticleLoading', payload: false })
                })
                .catch((error) => {
                    log.error('handleTreeSelect error', error)

                    get404Md()
                        .then((result) =>
                            dispatch({
                                type: 'setMarkdownData',
                                payload: result,
                            }),
                        )
                        .finally(() =>
                            dispatch({
                                type: 'setArticleLoading',
                                payload: false,
                            }),
                        )
                })
        },
        [state.prevSelectedFilePath, state.isOpenDirectoryOnlyArticle],
    )

    const handleTreeExpand = useCallback((expandKeys: string[]) => {
        storage.saveLocalStorage({
            key: LOCAL_STORAGE_NAME.ARTICLE_TREE_EXPANDED_KEYS,
            value: JSON.stringify(expandKeys),
        })

        dispatch({ type: 'setExpandedKeys', payload: expandKeys })
    }, [])

    // 如果 queryString 包含 redirected=true, 则此 hook 触发.
    useRedirected(dispatch, [])

    // 监听键盘 CTRL + SHIFT + F 按下, 从而打开文章搜索框, 用来搜索文章目录, 或文章内容.
    useWindowEventListener('keydown', function (event) {
        const isCtrlShiftX =
            event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'x'

        if (event.key === 'Escape' && state.showSearchPanel) {
            dispatch({ type: 'setShowSearchPanel', payload: false })
        }

        // 检查按下的键是否符合组合
        if (isCtrlShiftX) {
            event.preventDefault()
            // 在这里执行你的操作
            dispatch({
                type: 'setShowSearchPanel',
                payload: !state.showSearchPanel,
            })
        }
    })

    /** 刷新/切换路由，然后再点进来时，加载最后一次点击的目录的文件数据
     * 注意: 启动本地服务, 不会走 public/404.html, 并且类似 URL: /feature/article/xx.md 是可以获取数据的.
     * why? 可能是本地启动服务数据加载不一样吧; 如果先打包(yarn build), 然后将打包文件放入服务器(http-server dist)
     * 这样再访问 /feature/article/xx.md 就没有问题, 会走 public/404.html
     */
    useEffect(() => {
        if (isRedirected) {
            return
        }

        const sk = storage.getLocalStorage(
            LOCAL_STORAGE_NAME.SELECTED_ARTICLE_KEY,
        )

        const filepath = sk.slice(sk.indexOf('/article'))

        urlChange(
            `${window.location.origin}/feature${filepath}${window.location.hash}`,
        )

        if (!filepath || !stringIncludesArray(filepath, ARTICLE_SUFFIX_NAME)) {
            urlChange(`${window.location.origin}/feature/article`)

            get404Md().then((result) =>
                dispatch({
                    type: 'setMarkdownData',
                    payload: result,
                }),
            )

            return
        }

        const startTime = Date.now()

        dispatch({ type: 'setArticleLoading', payload: true })

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
                dispatch({
                    type: 'setMarkdownData',
                    payload: data,
                })
                dispatch({ type: 'setArticleLoading', payload: false })
            })
            .catch((error) => {
                log.group('initFileDataWhenFirstLoad error', [
                    {
                        type: 'error',
                        message: error,
                    },

                    {
                        type: 'log',
                        message: `filepath: ${filepath}`,
                    },
                ])

                // 如果错误被执行, 说明第一次进来就出错了, 这很严重, 所以放弃所有本地存储, 重新再存储.
                storage.clearAllLocalStorage()

                get404Md()
                    .then((result) =>
                        dispatch({
                            type: 'setMarkdownData',
                            payload: result,
                        }),
                    )
                    .finally(() =>
                        dispatch({ type: 'setArticleLoading', payload: false }),
                    )
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

        localSelectedArticleKey &&
            dispatch({
                type: 'setSelectedKey',
                payload: localSelectedArticleKey,
            })

        localExpandedKeys &&
            dispatch({
                type: 'setExpandedKeys',
                payload:
                    localExpandedKeys.length > 0
                        ? localExpandedKeys
                        : DEFAULT_EXPANDED_KEYS,
            })
    }, [])

    // 监听 Header - 打开菜单按钮点击事件; 用来控制 显示/隐藏 所有文章目录
    useEffect(() => {
        EventEmitter.on(EVENT_NAME.OPEN_ARTICLE_DIRECTORY, () => {
            dispatch({
                type: 'setIsOpenDirectoryOnlyArticle',
                payload: !state.isOpenDirectoryOnlyArticle,
            })
        })

        return () => {
            EventEmitter.off(EVENT_NAME.OPEN_ARTICLE_DIRECTORY)
        }
    }, [state.isOpenDirectoryOnlyArticle])

    // 监听搜索面板打开按钮点击事件; 用来控制 显示 搜索面板
    useEffect(() => {
        EventEmitter.on(EVENT_NAME.TOGGLE_SEARCH_PANEL, (result: boolean) => {
            dispatch({ type: 'setShowSearchPanel', payload: result })
        })

        return () => {
            EventEmitter.off(EVENT_NAME.TOGGLE_SEARCH_PANEL)
        }
    }, [])

    return (
        <div
            className={classnames(style.article, {
                [style[`article-${theme}`]]: true,
            })}
        >
            <div
                className={classnames(style.directoryTreeBox, {
                    [style.showDirectorOnlyArticle]:
                        state.isOpenDirectoryOnlyArticle,
                })}
            >
                <DirectoryTree
                    className={style.directoryTree}
                    treeData={(fileTree as any[]) || []}
                    expandedKeys={state.expandedKeys}
                    onExpand={handleTreeExpand as any}
                    selectedKeys={[state.selectedKey]}
                    onSelect={handleTreeSelect as any}
                />
            </div>

            <Skeleton
                active
                paragraph={PARAGRAPH}
                loading={state.articleLoading}
                className={style.skeleton}
            >
                <Markdown
                    className={classnames(style.markdown, {
                        [style.hideMarkdownOnlyArticle]:
                            state.isOpenDirectoryOnlyArticle,
                    })}
                >
                    {state.markdownData}
                </Markdown>
            </Skeleton>

            <div className={style.markNavbarBox}>
                <MarkdownNavbar
                    ordered={false}
                    headingTopOffset={0}
                    source={state.articleLoading ? '' : state.markdownData}
                />
            </div>

            {createPortal(
                <SearchPanel
                    isShow={state.showSearchPanel}
                    fileTree={fileTree}
                    maskClosable={true}
                    onTreeSelect={handleTreeSelect}
                    onTreeExpand={handleTreeExpand}
                    onClose={() =>
                        dispatch({ type: 'setShowSearchPanel', payload: false })
                    }
                />,
                document.body,
            )}
        </div>
    )
}

export default memo(Article)
