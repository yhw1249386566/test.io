import { memo, useMemo, useCallback, useState, useEffect } from 'react'
import { Tree, Skeleton } from 'antd'

import IndexedDB from '~/packages/y-indexeddb'
import classnames from '~/packages/y-classnames'
import EventEmitter from '~/packages/y-eventmitter'

import { Markdown } from '@/component'
import request from '@/utils/request'
import articleDir from '@/article_dir.js'
import { delay, createFileTree, storage } from '@/utils'

import style from './index.less'

const DEFAULT_EXPANDED_KEYS = [
    '0_base',
    '1_front_end',
    '6_error_handler',
    '8_test',
    '9_tools',
]

const { DirectoryTree } = Tree

function Article() {
    const [markdownData, setMarkdownData] = useState('')

    const fileTree = useMemo(() => createFileTree(articleDir), [articleDir])

    const [prevSelectedFilePath, setPrevSelectedFilePath] = useState('')

    // 注: 这里的 in mobile, 并不代表一定在手机端，即：如果视区宽度 < 1000px, 则认为在手机端(后面会改成正确的语义)
    const [isOpenDirectoryInMobile, setIsOpenDirectoryInMobileInMobile] =
        useState(false)

    const isHaveSkeleton = useMemo(
        () => storage.getLocalStorage('activeFilePath') && !markdownData,
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

            /* 遗留代码，暂时留着 */
            // const importFilePath = (activePath as string)
            //     ?.split('article')[1]
            //     ?.replace('.md', '')
            //     ?.replaceAll('\\', '/') // 最后得到例如: '/css/缓存'
            // https://webpack.docschina.org/api/module-methods/#dynamic-expressions-in-import
            // import() 必须至少包含一些关于模块的路径信息。
            // 如果是在运行时，webpack 才知道路径，文件类型，那么是找不到这个文件的，比如：
            // 直接使用 path: H:/username/yomua/src/article/css/缓存.md
            // const data
            // 保留最后一次点击的文件数据
            // IndexedDB.singleInstance.clearDataFromStore()
            // IndexedDB.singleInstance.updateDataFromStore(
            //     activePath,
            //     data?.default,
            // )
            // setMarkdownData(data?.default)= await import(`@/assets/article${importFilePath}.md`)

            const importFilePath = (activePath as string)
                ?.split('article')[1]
                ?.replaceAll('\\', '/') // 最后得到例如: '/css/缓存.md', fetch 不需要担心 import() 的情况，即: 必须包含一些路径信息。

            // 通过 fetch 获取根目录下的 article.
            // 不通过 import(), import() 会造成按需加载时，将每一个动态导入的 .md 文件视为一个路由，从而在 build 后多一个拆分的 js 文件
            request(`/article${importFilePath}`).then((res) => {
                const { data, success } = res

                if (!success || !data) {
                    get404Md()
                    return
                }

                setMarkdownData(data)

                // 保留最后一次点击的文件数据
                IndexedDB.singleInstance.clearDataFromStore()
                IndexedDB.singleInstance.updateDataFromStore(activePath, data)

                // in mobile 时，若打开了文章目录，选中一个文章时，会直接切换到文章。
                if (isOpenDirectoryInMobile) {
                    setIsOpenDirectoryInMobileInMobile(false)
                }
            })
        },
        [prevSelectedFilePath, isOpenDirectoryInMobile],
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
        EventEmitter.singleInstance.on('openArticleDirectoryInMobile', () => {
            setIsOpenDirectoryInMobileInMobile(!isOpenDirectoryInMobile)
        })
        return () => {
            EventEmitter.singleInstance.off('openArticleDirectoryInMobile')
        }
    }, [isOpenDirectoryInMobile])
    console.log('_isOpenDirectoryInMobile', isOpenDirectoryInMobile)
    return (
        <div className={style.article}>
            <div
                className={classnames(style.articleFileTree, {
                    [style.showDirectoryInMobile]: isOpenDirectoryInMobile,
                })}
            >
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
                    className={classnames(style.markdown, {
                        [style.hideMarkdownInMobile]: isOpenDirectoryInMobile,
                    })}
                >
                    {markdownData}
                </Markdown>
            )}
        </div>
    )
}

export default memo(Article)
