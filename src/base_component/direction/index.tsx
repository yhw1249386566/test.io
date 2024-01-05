import React, { memo } from 'react'
import classnames from '@yomua/y-classnames'

import style from './index.less'

type Div = React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>

interface DirectionProps extends Div {
    gap?: number
    className?: string
    mode?: 'row' | 'column'
    children?: React.ReactNode
    alignItems?: 'center' | 'space-between'
    justifyContent?: 'center' | 'space-between'
}

const Direction = (props: DirectionProps) => {
    const {
        children,
        mode = 'row',
        className = '',
        alignItems,
        justifyContent,
        gap,
        ...otherProps
    } = props

    return (
        <div
            className={classnames(style[mode], className)}
            style={{
                justifyContent,
                alignItems,
                gap: gap ? `${gap}px` : undefined,
            }}
            {...otherProps}
        >
            {children}
        </div>
    )
}

export default memo(Direction)
