import { memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'umi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

import classnames from '~/packages/y-classnames'
import EventEmitter from '~/packages/y-eventmitter'

import { storage } from '@/utils'
import { Text, Direction } from '@/component'
import { RouteName, RouteLink, EVENT_EMITTER_NAME } from '@/constant'

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

    // 显示 [X] 图标
    const [isShowX, setIsShowX] = useState(false)

    const history = useHistory()
    const location = useLocation()

    const handleClickTitle = useCallback(() => {
        history.push(`/${RouteLink.Index}`)
        setIsShowX(false)
    }, [])

    const handleToggleTheme = useCallback((theme: Theme) => {
        return () => {
            storage.saveLocalStorage({
                key: 'data-theme',
                value: theme === 'light' ? 'dark' : 'light',
            })

            if (theme === 'light') {
                onToggleTheme('dark')
                return
            }
            onToggleTheme('light')
        }
    }, [])

    const handleOpenDirectoryOnlyArticle = useCallback(() => {
        EventEmitter.singleInstance.emit(
            EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY,
            {
                isShowX: !isShowX,
            },
        )
    }, [isShowX])

    const handleBack = useCallback(() => {
        history.goBack()
    }, [])

    useEffect(() => {
        const localTheme = storage.getLocalStorage('data-theme') as Theme

        if (localTheme) {
            onToggleTheme(localTheme)
        }

        EventEmitter.singleInstance.on(
            EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY,
            ({ isShowX }) => {
                setIsShowX(isShowX)
            },
        )
        return () => {
            EventEmitter.singleInstance.off(
                EVENT_EMITTER_NAME.OPEN_ARTICLE_DIRECTORY,
            )
        }
    }, [])

    return (
        <div className={classnames(style.header, style[`header-${theme}`])}>
            <Direction
                alignItems='center'
                justifyContent='space-between'
                className={style.headerInfo}>
                {/* <FontAwesomeIcon
                    className={classnames(style.back, {
                        [style.hideLeftIcon]:
                            location.pathname === `/${RouteLink.Index}`,
                    })}
                    icon='chevron-left'
                    onClick={handleBack}
                /> */}

                <FontAwesomeIcon
                    icon={isShowX ? 'times' : 'bars'}
                    className={classnames(style.bars, {
                        [style.hideBars]:
                            location.pathname !== '/feature/article' &&
                            !location.pathname.includes('/heading'),
                    })}
                    onClick={handleOpenDirectoryOnlyArticle}
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
