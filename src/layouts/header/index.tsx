import { memo } from 'react'
import { useHistory } from 'umi'
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

    const handleClickTitle = () => history.push('/index')

    const handleToggleTheme = () => {
        if (theme === 'light') {
            onToggleTheme('dark')
            return
        }
        onToggleTheme('light')
    }

    return (
        <div className={style.box}>
            <Direction className={style.titleBox}>
                <Text
                    type='primary'
                    className={style.title}
                    onClick={handleClickTitle}
                >
                    青芽
                </Text>
            </Direction>

            <Direction>
                <Navigation
                    type='primary'
                    data={navigationData}
                    className={style.navigation}
                />
            </Direction>

            <FontAwesomeIcon
                className={style.themeIcon}
                icon={theme === 'light' ? faSun : (faMoon as any)}
                onClick={handleToggleTheme}
            />
        </div>
    )
}

export default memo(Header)
