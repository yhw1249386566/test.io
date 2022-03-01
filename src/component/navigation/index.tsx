import React from 'react'
import { Link } from 'umi'
import { Type } from '../text'
import { Text } from '../index'

type DivProps = React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>

interface Props extends DivProps {
    data: {
        id: string
        label: React.ReactNode
        link: string
    }[]
    type?: Type
}

const Navigation = (props: Props) => {
    const { data, type, ...otherProps } = props

    return (
        <div {...otherProps}>
            {data.map((item, index) => {
                const { label, link, id } = item

                return (
                    <Link key={id ?? index} to={`/${link}`}>
                        <Text type={type}>{label}</Text>
                    </Link>
                )
            })}
        </div>
    )
}

export default Navigation
