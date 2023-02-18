import React, { memo } from 'react'
import classnames from 'classnames'

import style from './index.less'

type Text = React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>

export type Type = 'primary' | 'secondary'

interface TextProps extends Text {
    type?: Type
    children?: React.ReactNode
    className?: string
}

const Text = (props: TextProps) => {
    const { type = 'primary', className = '', ...otherProps } = props

    const textClassName = classnames(style.text, className, {
        [style.primary]: type === 'primary',
        [style.secondary]: type === 'secondary',
    })

    return (
        <div className={textClassName} {...otherProps}>
            {props.children}
        </div>
    )
}

export default memo(Text)
