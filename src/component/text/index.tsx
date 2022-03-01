import React from 'react'
import { useTheme } from '@/hooks'

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
    const { primaryTextColor, secondaryColor } = useTheme()

    const colorStrategy = new Map([
        ['primary', () => primaryTextColor],
        ['secondary', () => secondaryColor],
        ['title', () => 'rgba(255, 255, 255, 0.65)'],
    ])

    const getColor = (type: Type) =>
        colorStrategy.get(type)?.() ?? primaryTextColor

    return (
        <div style={{ color: getColor(type), width: 'max-content' }} {...props}>
            {props.children}
        </div>
    )
}

export default Text
