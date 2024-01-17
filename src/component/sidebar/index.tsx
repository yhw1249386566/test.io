import { memo, useCallback, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getType } from '@yomua/y-screw'
import classnames from '@yomua/y-classnames'
import { useWindowEventListener } from '@yomua/y-hooks'
import log from '@yomua/y-tlog'

import { useTheme } from '@/hooks'
import { SCROLL_SPEED } from '@/utils/constant'

import style from './index.less'

function Sidebar() {
    const [isShowSidebar, setIsShowSidebar] = useState(false)

    const theme = useTheme()

    const prevScrollPosition = useRef(document.documentElement.scrollTop)

    const handleTop: React.MouseEventHandler<SVGSVGElement> = useCallback(
        (event) => {
            event.preventDefault()

            let currentLocation = document.documentElement.scrollTop

            function slider() {
                if (currentLocation < 0) {
                    window.scrollTo(0, 0)
                    return
                }

                if (getType(SCROLL_SPEED) !== 'number' || isNaN(SCROLL_SPEED)) {
                    log.group('SCROLL_SPEED ERROR', [
                        { type: 'info', message: SCROLL_SPEED },
                    ])
                    window.scrollTo(0, 0)
                    return
                }

                currentLocation -= SCROLL_SPEED
                window.scrollTo(0, currentLocation)
                window.requestAnimationFrame(slider)
            }

            slider()
        },
        [],
    )

    useWindowEventListener(
        'scroll',
        (event) => {
            if (!(event.target instanceof Document)) {
                return
            }

            const { scrollTop = 0 } = event?.target?.documentElement ?? {
                scrollTop: 0,
            }

            // 往下滚动
            const isDownScroll = scrollTop > prevScrollPosition.current

            if (scrollTop === 0 || isDownScroll) {
                setIsShowSidebar(false)
                prevScrollPosition.current = scrollTop
                return
            }

            // 此处相当于往上滚动, 则显示 sidebar
            prevScrollPosition.current = scrollTop
            setIsShowSidebar(true)
        },
        [],
        { delay: 100 },
    )

    return (
        <div
            className={classnames(style.sidebar, style[`sidebar-${theme}`], {
                [style.sidebarHide]: !isShowSidebar,
            })}
        >
            <FontAwesomeIcon
                icon='circle-chevron-up'
                className={style.goTop}
                onClick={handleTop}
            />
        </div>
    )
}

export default memo(Sidebar)
