import { memo, useCallback } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useTheme } from '@/hooks'

import style from './index.less'

function SideBar() {
    const theme = useTheme()

    const handleTop = useCallback(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={classNames(style.sidebar, style[`sidebar-${theme}`])}>
            <FontAwesomeIcon
                icon='jet-fighter-up'
                className={style.goTop}
                onClick={handleTop}
            />
        </div>
    )
}

export default memo(SideBar)
