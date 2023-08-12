import React, { memo, useMemo, useCallback, useState, useEffect } from 'react'
import { Tree, Skeleton } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { indexedDB } from '@/class'
import { Markdown } from '@/component'
import articleDir from '@/articleDir.js'
import {
    delay,
    createFileTree,
    getLocalStorage,
    saveLocalStorage,
} from '@/utils'

import style from './index.less'
import classNames from 'classnames'

const { DirectoryTree } = Tree

function Article() {
    const [markdownData, setMarkdownData] = useState('')

    const fileTree = useMemo(() => createFileTree(articleDir), [articleDir])

    const [isShowDirectoryTree, setIsShowDirectoryTree] = useState(true)

    const [prevSelectedFilePath, setPrevSelectedFilePath] = useState('')

    const isHaveSkeleton = useMemo(
        () => getLocalStorage('activeFilePath') && !markdownData,
        [markdownData],
    )

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
            saveLocalStorage({ key: 'activeFilePath', value: activePath })

            const importFilePath = (activePath as string)
                ?.split('article')[1]
                ?.replace('.md', '')
                ?.replaceAll('\\', '/') // '/css/缓存'

            // 对于动态导入,必须要让 webpack 未编译前就知道它是什么类型的文件，
            // 如果是在运行时，webpack 才知道路径，文件类型，那么是找不到这个文件的，比如：
            // 直接使用 path: H:/username/yomua/src/article/css/缓存.md
            const data = await import(`@/assets/article${importFilePath}.md`)

            // 保留最后一次点击的文件数据
            indexedDB.clearDataFromStore()
            indexedDB.updateDataFromStore(activePath, data?.default)

            setMarkdownData(data?.default)
        },
        [prevSelectedFilePath],
    )

    const handleSwitchFileTree = useCallback(() => {
        setIsShowDirectoryTree(!isShowDirectoryTree)
    }, [isShowDirectoryTree])

    // 刷新/切换路由，然后再点进来时，加载最后一次点击的目录的文件数据
    useEffect(() => {
        const filepath = getLocalStorage('activeFilePath') as string

        if (!filepath) return

        const startTime = Date.now()

        async function getArticleDataFromStore() {
            const req = indexedDB.getDataFromStore(filepath)
            req.onsuccess = async (event: any) => {
                const result: { filepath: string; file: string } =
                    event?.target?.result

                const endTime = Date.now()

                // 由于拿 IndexedDB 数据需要时间，但是时间又太短（几十毫秒）
                // 所以为了给用户良好的体验（不要一闪而过），给 loading 加至少要延迟 500ms
                if (endTime - startTime < 500) {
                    await delay(500 - (endTime - startTime))
                }
                setMarkdownData(result?.file ?? '')
            }
        }

        getArticleDataFromStore()
    }, [])

    return (
        <div className={style.article}>
            <div
                className={classNames(style.articleFileTree, {
                    [style.showDirectoryTree]: isShowDirectoryTree,
                    [style.hideDirectoryTree]: !isShowDirectoryTree,
                })}>
                <div className={style.switchTreeIcon}>
                    <FontAwesomeIcon
                        icon='circle-chevron-left'
                        onClick={handleSwitchFileTree}
                    />
                </div>

                <DirectoryTree
                    height={200}
                    className={style.directoryTree}
                    treeData={fileTree as any[]}
                    onSelect={handleTreeSelect as any}
                />
            </div>

            {isHaveSkeleton && (
                <Skeleton
                    className={style.skeleton}
                    active
                    paragraph={{ rows: 20 }}
                />
            )}

            {markdownData && <Markdown children={markdownData} />}
        </div>
    )
}

export default memo(Article)
