import React, { memo } from 'react'
import classnames from '@yomua/y-classnames'

import style from './index.less'

type Div = React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>

interface DirectionProps extends Div {
    className?: string
    mode?: 'row' | 'column'
    children?: React.ReactNode
}

const Direction = (props: DirectionProps) => {
    const { children, mode = 'row', className = '', ...otherProps } = props

    return (
        <div className={classnames(style[mode], className)} {...otherProps}>
            {children}
        </div>
    )
}

export default memo(Direction)
