import { memo, useEffect, useState } from 'react'
import { useHistory } from 'umi'
import { useLocation } from 'react-router-dom'
import classnames from '@yomua/y-classnames'
import EventEmitter from '@yomua/y-eventemitter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

import storage from '@/utils/storage'
import { Direction, Search } from '@/component'
import { RouteLink, EVENT_NAME, LOCAL_STORAGE_NAME } from '@/utils/constant'

import Style from './index.less'

interface HeaderProps {
    theme?: Theme
    onToggleTheme?: (theme: Theme) => void
}

const Header = (props: HeaderProps) => {
    const { theme = 'light', onToggleTheme = () => null } = props

    const [menuIcon, setMenuIcon] = useState<'bars' | 'xmark'>('bars')

    const history = useHistory()
    const location = useLocation() // 不能替换为 location, 要用 useLocation 来监听 url change, 从而使得组件重新渲染

    useEffect(() => {
        EventEmitter.on(EVENT_NAME.HEADER_MENU_ICON, (icon) => {
            setMenuIcon(icon)
        })

        return () => {
            EventEmitter.off(EVENT_NAME.HEADER_MENU_ICON)
        }
    }, [])

    return (
        <div className={classnames(Style.header, Style[`header-${theme}`])}>
            <Direction className={Style.headerInfo}>
                <Direction className={Style.left}>
                    <FontAwesomeIcon
                        icon={menuIcon}
                        className={classnames(Style.menuIcon, {
                            [Style.hideMenuIcon]:
                                !location.pathname.includes('/feature/article'),
                        })}
                        onClick={() => {
                            setMenuIcon(menuIcon === 'bars' ? 'xmark' : 'bars')
                            EventEmitter.emit(EVENT_NAME.OPEN_ARTICLE_DIRECTORY)
                        }}
                    />

                    <div
                        className={Style.logo}
                        onClick={() => {
                            history.push(`/${RouteLink.Index}`)
                            setMenuIcon('bars')
                        }}
                    ></div>
                </Direction>

                <div
                    className={Style.searchBox}
                    onClick={() => {
                        EventEmitter.emit(EVENT_NAME.SHOW_SEARCH_PANEL)
                    }}
                >
                    {location.pathname.includes('/feature/article') && (
                        <Search />
                    )}
                </div>

                <Direction style={Style.right}>
                    <FontAwesomeIcon
                        className={Style.themeIcon}
                        icon={theme === 'light' ? faSun : faMoon}
                        onClick={() => {
                            const activeTheme =
                                theme === 'light' ? 'dark' : 'light'

                            storage.saveLocalStorage({
                                key: LOCAL_STORAGE_NAME.DATA_THEME,
                                value: activeTheme,
                            })

                            // 将在 @/index 设置主题
                            onToggleTheme(activeTheme)
                        }}
                    />
                </Direction>
            </Direction>
        </div>
    )
}

export default memo(Header)
