import { useState, memo, useRef, useEffect } from 'react'
import classnames from '@yomua/y-classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-regular-svg-icons'

import useTheme from '@/hooks/useTheme'
import { parseArticlePath } from '@/utils'
import { ArticleFileTree } from '@/utils/utils.d'
import { setSearchValue } from '@/storeData/article'
import { Text, Search } from '@/component'
import storage from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/utils/constant'

import Style from './index.less'

type SearchPanelProps = {
    isShow: boolean
    fileTree: ArticleFileTree[]
    onTreeExpand: (expandKeys: string[]) => void
    onClose: () => void
    onTreeSelect: (
        path: string[],
        info: {
            node: {
                type: 'file' | 'directory'
            }
        },
    ) => void
}

const BodyHiddenClass = 'overflowHidden'

const SearchPanel = (props: SearchPanelProps) => {
    const { isShow, fileTree, onTreeSelect, onTreeExpand, onClose } = props

    const theme = useTheme()

    const searchRef = useRef<HTMLInputElement>(null)

    const [searchResult, setSearchResult] = useState<ArticleFileTree[]>([])

    useEffect(() => {
        if (!isShow) {
            return
        }

        searchRef.current?.focus()
        document.body.classList.add(BodyHiddenClass)
    }, [isShow])

    if (!isShow) {
        document.body.classList.remove(BodyHiddenClass)
        return null
    }

    return (
        <div className={classnames(Style.mask, Style[`searchPanel-${theme}`])}>
            <div className={Style.container}>
                <div className={Style.header}>
                    <Search
                        ref={searchRef}
                        placeholder='搜索文章'
                        onClear={() => {
                            setSearchValue('')
                            setSearchResult([])
                        }}
                        onChange={(value: string) => {
                            if (!value) {
                                setSearchResult([])
                                return
                            }

                            const result: ArticleFileTree[] = []

                            ;(function getSearchResult(
                                root: ArticleFileTree[],
                            ) {
                                root.forEach((item) => {
                                    if (
                                        item.children &&
                                        item.children.length > 0
                                    ) {
                                        getSearchResult(item.children)
                                        return
                                    }

                                    if (
                                        item.type === 'file' &&
                                        item.title.includes(value)
                                    ) {
                                        result.push(item)
                                    }
                                })
                            })(fileTree)

                            storage.saveLocalStorage({
                                key: LOCAL_STORAGE_NAME.SEARCH_HISTORY_RESULT,
                                value:
                                    result.length > 0
                                        ? JSON.stringify(result)
                                        : '[]',
                            })
                            setSearchResult(result)
                        }}
                    />

                    <div className={Style.close} onClick={onClose}>
                        关闭
                    </div>
                </div>
                <div className={Style.body}>
                    <Text style={{ margin: '12px' }}>
                        {searchResult?.length ? '搜索结果' : '历史记录'}
                    </Text>
                    <ul className={Style.result}>
                        {/* 显示搜索结果 或 历史记录 */}
                        {(searchResult.length
                            ? searchResult
                            : storage.getLocalStorage<'array', ArticleFileTree>(
                                  LOCAL_STORAGE_NAME.SEARCH_HISTORY_RESULT,
                                  { returnType: 'array' },
                              )
                        ).map((item: ArticleFileTree) => {
                            return (
                                <li
                                    className={Style.resultItem}
                                    key={item.key}
                                    onClick={() => {
                                        if (!item?.key) {
                                            return
                                        }

                                        onTreeSelect([item.key], {
                                            node: { type: 'file' },
                                        })

                                        onTreeExpand(
                                            parseArticlePath(
                                                item.path
                                                    .slice(
                                                        item.path.indexOf(
                                                            '/article',
                                                        ),
                                                    )
                                                    .replace('/article/', ''),
                                            ),
                                        )

                                        onClose()
                                    }}
                                >
                                    <div className={Style.top}>
                                        <Text>
                                            <FontAwesomeIcon icon={faFile} />
                                        </Text>
                                        <Text>
                                            {item.title.replace(/.md$/, '')}
                                        </Text>
                                    </div>
                                    <div className={Style.weak}>
                                        {item.path.slice(
                                            item.path.indexOf('/article') +
                                                '/article/'.length,
                                        )}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className={Style.footer}></div>
            </div>
        </div>
    )
}

export default memo(SearchPanel)
