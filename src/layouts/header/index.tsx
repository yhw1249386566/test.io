import { memo, useEffect, useState } from 'react'
import { useHistory } from 'umi'
import { useLocation } from 'react-router-dom'
import classnames from '@yomua/y-classnames'
import EventEmitter from '@yomua/y-eventemitter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

import storage from '@/utils/storage'
import { Text, Direction } from '@/component'
import { RouteLink, EVENT_NAME, LOCAL_STORAGE_NAME } from '@/utils/constant'

import style from './index.less'

interface HeaderProps {
    theme?: Theme
    onToggleTheme?: (theme: Theme) => void
}

const Header = (props: HeaderProps) => {
    const { theme = 'light', onToggleTheme = () => null } = props

    const [menuIcon, setMenuIcon] = useState<'bars' | 'xmark'>('bars')

    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        EventEmitter.on(EVENT_NAME.HEADER_MENU_ICON, (icon) => {
            setMenuIcon(icon)
        })

        return () => {
            EventEmitter.off(EVENT_NAME.HEADER_MENU_ICON)
        }
    }, [])

    return (
        <div className={classnames(style.header, style[`header-${theme}`])}>
            <Direction className={style.headerInfo}>
                <FontAwesomeIcon
                    icon={menuIcon}
                    className={classnames(style.menuIcon, {
                        [style.hideMenuIcon]:
                            !location.pathname.includes('/feature/article'),
                    })}
                    onClick={() => {
                        setMenuIcon(menuIcon === 'bars' ? 'xmark' : 'bars')
                        EventEmitter.emit(EVENT_NAME.OPEN_ARTICLE_DIRECTORY)
                    }}
                />
                <Text
                    className={style.title}
                    onClick={() => {
                        history.push(`/${RouteLink.Index}`)
                        setMenuIcon('bars')
                    }}
                >
                    青芽
                </Text>
                <FontAwesomeIcon
                    className={style.themeIcon}
                    icon={theme === 'light' ? faSun : faMoon}
                    onClick={() => {
                        const activeTheme = theme === 'light' ? 'dark' : 'light'

                        storage.saveLocalStorage({
                            key: LOCAL_STORAGE_NAME.DATA_THEME,
                            value: activeTheme,
                        })

                        // 将在 @/index 设置主题
                        onToggleTheme(activeTheme)
                    }}
                />
            </Direction>
        </div>
    )
}

export default memo(Header)
