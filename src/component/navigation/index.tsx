import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import { Text } from '../index'

type DivProps = React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>

interface Props extends DivProps {
    data: {
        id: string
        label: React.ReactNode
        link: string
    }[]
}

const Navigation = (props: Props) => {
    const { data, ...otherProps } = props

    return (
        <div {...otherProps}>
            {data.map((item, index) => {
                const { label, link, id } = item

                return (
                    <Link key={id ?? index} to={`/${link}`}>
                        <Text>{label}</Text>
                    </Link>
                )
            })}
        </div>
    )
}

export default memo(Navigation)
