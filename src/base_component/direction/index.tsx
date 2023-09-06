import React, { memo } from 'react'

import classnames from '~/packages/classnames'

import style from './index.less'

type Div = React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>

interface DirectionProps extends Div {
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
        alignItems = 'center',
        justifyContent = 'center',
        ...otherProps
    } = props

    return (
        <div
            className={classnames(style[mode], className)}
            style={{
                justifyContent,
                alignItems,
            }}
            {...otherProps}
        >
            {children}
        </div>
    )
}

export default memo(Direction)
