// Ref: https://github.com/parksben/markdown-navbar
// 基于此库进行二次开发
// 此组件也完全解耦, 可以作为一个新包发布.
import { useState, useEffect, memo } from 'react'

import { useTheme } from '@/hooks'

import {
    updateHash,
    safeScrollTo,
    getNavStructure,
    getCurrentHashValue,
} from './utils'
import './index.less'
import { debounce } from '@yomua/y-screw'

let addTargetTimeout: NodeJS.Timeout
let scrollTimeout: NodeJS.Timeout

type MarkdownNavbarProps = {
    headingTopOffset: number
    source: string // markdown 数据
    className?: string
    declarative?: boolean
    updateHashAuto?: boolean
    ordered?: boolean
    onHashChange?: (dataId: string, hashValue: string) => void
    onNavItemClick?: (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        currentHash: string,
    ) => void
}

export default memo(function MarkdownNavbar(props: MarkdownNavbarProps) {
    const theme = useTheme()

    const [currentListNo, setCurrentListNo] = useState('')

    const [navStructure, setNavStructure] = useState<
        {
            index: number
            level: number
            listNo: string
            text: string
        }[]
    >([])

    function refreshNav(source) {
        if (addTargetTimeout) {
            clearTimeout(addTargetTimeout)
        }

        const navStructure = getNavStructure(source)

        setNavStructure(navStructure)
    }

    function scrollToTarget(dataId: string) {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout)
        }

        scrollTimeout = setTimeout(() => {
            const target = document.querySelector(
                `[data-id="${dataId}"]`,
            ) as HTMLElement

            if (target && typeof target.offsetTop === 'number') {
                safeScrollTo(window, target.offsetTop - props.headingTopOffset)
            }
        }, 0)
    }

    function initHeadingsId() {
        const headingId = decodeURIComponent(
            props.declarative
                ? location.hash.replace(/^#/, '').trim()
                : (location.hash.match(/heading-\d+/g) || [])[0] ?? '',
        )

        navStructure.forEach((t) => {
            // 获取文档中的所有标题元素
            const headings = document.querySelectorAll(`h${t.level}`)
            // 将 headings 转为数组, 并在此数组中 (所有的标题元素 (h1, h2...)) 中找到 markdown 的标题, 且此标题没有 data-id
            // TIP: dataset (是一个对象) 表示 data-* 属性, 参见: https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset
            const curHeading = Array.prototype.slice
                .apply(headings)
                .find(
                    (h) =>
                        h.innerText.trim() === t.text.trim() &&
                        (!h.dataset || !h.dataset.id),
                )

            // 如果找到了这个标题元素，就给它添加 data-id 属性
            if (curHeading) {
                curHeading.dataset.id = props.declarative
                    ? `${t.listNo}-${t.text}`
                    : `heading-${t.index}`

                // 如果 url 中有对应的 headingId，则就滚动文档到此 heading 对应的位置
                if (headingId && headingId === curHeading.dataset.id) {
                    scrollToTarget(headingId)
                    setCurrentListNo(t.listNo)
                }
            }
        })
    }

    function getHeadingList() {
        const headingList: {
            dataId: string
            listNo: string
            offsetTop: number
        }[] = []

        navStructure.forEach((t) => {
            const headings = document.querySelectorAll(`h${t.level}`)
            const curHeading = Array.prototype.slice
                .apply(headings)
                .find(
                    (h) =>
                        h.innerText.trim() === t.text.trim() &&
                        !headingList.find((x) => x.offsetTop === h.offsetTop),
                )
            if (curHeading) {
                headingList.push({
                    dataId: props.declarative ? t.text : `heading-${t.index}`,
                    listNo: t.listNo,
                    offsetTop: curHeading.offsetTop,
                })
            }
        })

        return headingList
    }

    const winScroll = debounce(() => {
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop || 0

        const newHeadingList = getHeadingList().map((h) => ({
            ...h,
            distanceToTop: Math.abs(
                scrollTop + props.headingTopOffset - h.offsetTop,
            ),
        }))
        const distanceList = newHeadingList.map((h) => h.distanceToTop)
        const minDistance = Math.min(...distanceList)
        const curHeading = newHeadingList.find(
            (h) => h.distanceToTop === minDistance,
        )

        if (!curHeading) return

        if (props.updateHashAuto) {
            if (curHeading.dataId !== getCurrentHashValue()) {
                props.onHashChange?.(curHeading.dataId, getCurrentHashValue())
            }
        }
        updateHash(curHeading.dataId)

        setCurrentListNo(curHeading.listNo)
    }, 50)

    // 初始化列表数据
    useEffect(() => {
        const { source } = props
        refreshNav(source)
    }, [])

    // 复用时开启，用于在 source 更新时刷新列表
    useEffect(() => {
        const { source } = props
        refreshNav(source)
    }, [props.source])

    useEffect(() => {
        const winHashChange = () => {
            const headingId = decodeURIComponent(
                props.declarative
                    ? location.hash.replace(/^#/, '').trim()
                    : (location.hash.match(/heading-\d+/g) || [])[0] ?? '',
            )
            scrollToTarget(headingId)
        }

        addTargetTimeout = setTimeout(() => {
            initHeadingsId()
            if (navStructure.length) {
                const { listNo } = navStructure[0]
                setCurrentListNo(listNo)
            }

            window.addEventListener('hashchange', winHashChange, false)
        }, 500)

        document.addEventListener('scroll', winScroll, false)

        return () => {
            if (addTargetTimeout) {
                clearTimeout(addTargetTimeout)
            }

            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }

            document.removeEventListener('scroll', winScroll, false)
            window.removeEventListener('hashchange', winHashChange, false)
        }
    }, [navStructure])

    return (
        <div
            className={`markdown-navigation ${props.className} markdown-navigation-${theme}`}
        >
            {getNavStructure(props.source).map((t) => {
                const cls = `title-anchor title-level${t.level} ${
                    currentListNo === t.listNo ? 'active' : ''
                }`

                return (
                    <div
                        className={cls}
                        key={`title_anchor_${Math.random()
                            .toString(36)
                            .substring(2)}`}
                        onClick={(evt) => {
                            const currentHash = props.declarative
                                ? `${t.listNo}-${t.text}` // 加入 listNo 确保 hash 唯一 ZZ
                                : `heading-${t.index}`

                            // 如果点击已经激活的导航项, 则不执行 onHashChange
                            if (t.listNo !== currentListNo) {
                                props.onHashChange?.(
                                    currentHash,
                                    getCurrentHashValue(),
                                )
                            }

                            props.onNavItemClick?.(evt, currentHash)

                            updateHash(currentHash)
                            scrollToTarget(currentHash)
                            setCurrentListNo(t.listNo)
                        }}
                    >
                        {props.ordered ? <small>{t.listNo}</small> : null}
                        {t.text}
                    </div>
                )
            })}
        </div>
    )
})
