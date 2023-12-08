import { memo, useCallback } from 'react'
import { useHistory } from 'umi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

import classnames from '~/packages/y-classnames'

import { Text, Direction } from '@/component'
import { RouteName, RouteLink } from '@/constant'

import style from './index.less'
import { useLocation } from 'umi'

interface HeaderProps {
    theme?: Theme
    onToggleTheme?: (theme: Theme) => void
}

// const navigationData = [
//     { id: 'index', label: RouteName.Index, link: RouteLink.Index },
//     { id: 'type', label: RouteName.Type, link: RouteLink.Type },
//     { id: 'mood', label: RouteName.Mood, link: RouteLink.Mood },
//     { id: 'about', label: RouteName.About, link: RouteLink.About },
// ]

const Header = (props: HeaderProps) => {
    const { theme = 'light', onToggleTheme = () => null } = props

    const history = useHistory()
    const location = useLocation()

    const handleClickTitle = useCallback(() => {
        history.push(`/${RouteLink.Index}`)
    }, [])

    const handleToggleTheme = useCallback((theme: Theme) => {
        return () => {
            if (theme === 'light') {
                onToggleTheme('dark')
                return
            }
            onToggleTheme('light')
        }
    }, [])

    const handleBack = useCallback(() => {
        history.goBack()
    }, [])

    return (
        <div className={classnames(style.header, style[`header-${theme}`])}>
            <Direction
                alignItems='center'
                justifyContent='space-between'
                className={style.headerInfo}
            >
                <FontAwesomeIcon
                    className={classnames(style.back, {
                        [style.hideLeftIcon]:
                            location.pathname === `/${RouteLink.Index}`,
                    })}
                    icon='chevron-left'
                    onClick={handleBack}
                />
                <Text className={style.title} onClick={handleClickTitle}>
                    青芽
                </Text>

                <FontAwesomeIcon
                    className={style.themeIcon}
                    icon={theme === 'light' ? faSun : faMoon}
                    onClick={handleToggleTheme(theme)}
                />
            </Direction>

            {/* 暂时不需要 Index Type Mood About 这些 */}
            {/*  <Direction>
                <Navigation
                    data={navigationData}
                    className={style.navigation}
                />
            </Direction> */}
        </div>
    )
}

export default memo(Header)
