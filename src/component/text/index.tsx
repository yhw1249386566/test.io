import React, { memo } from 'react'
import classnames from 'classnames'
import style from './index.less'

// type ReactHTMLDivElement = Omit<React.HTMLAttributes<HTMLDivElement>, 'css'>
type Text = React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>

export type Type = 'primary' | 'secondary' | 'title'

interface TextProps extends Text {
    type?: Type
    children?: React.ReactNode
}

const Text = (props: TextProps) => {
    const { type = 'primary' } = props

    const className = classnames(style.text, {
        [style.primary]: type === 'primary',
        [style.secondary]: type === 'secondary',
        [style.title]: type === 'title',
    })

    return (
        <div className={className} {...props}>
            {props.children}
        </div>
    )
}

export default memo(Text)
