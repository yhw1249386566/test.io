import { memo, useCallback } from 'react'
import { useHistory } from 'umi'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

import { RouteName, RouteLink } from '@/constant'
import { Text, Navigation, Direction } from '@/component'

import style from './index.less'

interface HeaderProps {
    theme?: Theme
    onToggleTheme?: (theme: Theme) => void
}

const navigationData = [
    { id: 'index', label: RouteName.Index, link: RouteLink.Index },
    { id: 'type', label: RouteName.Type, link: RouteLink.Type },
    { id: 'mood', label: RouteName.Mood, link: RouteLink.Mood },
    { id: 'about', label: RouteName.About, link: RouteLink.About },
]

const Header = (props: HeaderProps) => {
    const { theme = 'light', onToggleTheme = () => null } = props

    const history = useHistory()

    const handleClickTitle = useCallback(() => {
        history.push('/index')
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
        <div className={classNames(style.header, style[`header-${theme}`])}>
            <Direction
                alignItems='center'
                justifyContent='space-between'
                className={style.headerInfo}
            >
                <FontAwesomeIcon
                    className={style.back}
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
