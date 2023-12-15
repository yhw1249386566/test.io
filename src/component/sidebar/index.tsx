import { memo, useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classnames from '~/packages/y-classnames'

import { SCROLL_SPEED } from '@/utils/constant'
import { useTheme, useWindowEventListen } from '@/hooks'

import style from './index.less'

function Sidebar() {
    const [isShowSidebar, setIsShowSidebar] = useState(false)

    const theme = useTheme()

    const handleTop: React.MouseEventHandler<SVGSVGElement> = useCallback(
        (event) => {
            event.preventDefault()

            let currentLocation = document.documentElement.scrollTop

            function slider() {
                if (currentLocation < 0) {
                    window.scrollTo(0, 0)
                    return
                }

                if (typeof SCROLL_SPEED !== 'number' || isNaN(SCROLL_SPEED)) {
                    console.error(`SCROLL_SPEED ERROR: ${SCROLL_SPEED}`)
                    console.trace('SCROLL_SPEED')
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

    useWindowEventListen('scroll', (event) => {
        if (event.target instanceof Document) {
            if (event.target?.documentElement?.scrollTop === 0) {
                setIsShowSidebar(false)
                return
            }
        }

        setIsShowSidebar(true)
    })

    return (
        <div
            className={classnames(style.sidebar, style[`sidebar-${theme}`], {
                [style.sidebarHide]: !isShowSidebar,
            })}>
            <FontAwesomeIcon
                icon='circle-chevron-up'
                className={style.goTop}
                onClick={handleTop}
            />
        </div>
    )
}

export default memo(Sidebar)
