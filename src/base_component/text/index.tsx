import React, { memo } from 'react'

import classnames from '~/packages/y-classnames'

import { useTheme } from '@/hooks'

import style from './index.less'

type Text = React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>

interface TextProps extends Text {
    children?: React.ReactNode
    className?: string
}

const Text = (props: TextProps) => {
    const { className = '', ...otherProps } = props

    const theme = useTheme()

    const textClassName = classnames(style.text, className, {
        [style[`text-${theme}`]]: theme,
    })

    return (
        <div className={textClassName} {...otherProps}>
            {props.children}
        </div>
    )
}

export default memo(Text)
