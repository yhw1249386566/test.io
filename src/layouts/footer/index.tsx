import { memo } from 'react'

import classnames from '~/packages/classnames'

import { useTheme } from '@/hooks'
import { Text, Direction } from '@/component'

import style from './index.less'

const Footer = () => {
    const theme = useTheme()

    return (
        <Direction
            className={classnames(style.footer, style[`footer-${theme}`])}
        >
            <Text>©2021 Created by Yomua</Text>
        </Direction>
    )
}

export default memo(Footer)
