import { memo } from 'react'
import classNames from 'classnames'

import { useTheme } from '@/hooks'
import { Text, Direction } from '@/component'

import style from './index.less'

const DefaultFooter = () => {
    const theme = useTheme()

    return (
        <Direction
            className={classNames(style.footer, style[`footer-${theme}`])}
        >
            <Text>©2021 Created by Yomua</Text>
        </Direction>
    )
}

export default memo(DefaultFooter)
