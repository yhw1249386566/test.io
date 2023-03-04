import { memo, useCallback, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useTheme, useWindowEventListen } from '@/hooks'

import style from './index.less'

function Sidebar() {
    const [isShowSidebar, setIsShowSidebar] = useState(false)

    const theme = useTheme()

    const handleTop = useCallback((event) => {
        event.preventDefault()
        const scrollSpeed = 20

        let currentLocation = document.documentElement.scrollTop

        const task = setInterval(function () {
            if (currentLocation > 0) {
                window.scrollTo(0, currentLocation)
                currentLocation -= scrollSpeed
            } else {
                window.scrollTo(0, 0)
                clearInterval(task)
            }
        }, 1)
    }, [])

    useWindowEventListen('scroll', () => {
        if (document.documentElement.scrollTop === 0) {
            setIsShowSidebar(false)
            return
        }

        setIsShowSidebar(true)
    })

    return (
        <div
            className={classNames(style.sidebar, style[`sidebar-${theme}`], {
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
