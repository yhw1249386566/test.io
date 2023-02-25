import { memo, useState, useCallback } from 'react'
import classNames from 'classnames'
import { Tag, Card, Image, CardProps } from 'antd'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useTheme } from '@/hooks'
import { invertColor } from '@/utils'

import Text from '../text'

import style from './index.less'

interface CustomProps extends CardProps {
    img?: string
    title?: string
    author?: string
    time?: string
    description?: string
    tag?: {
        name: string
        key?: string
        icon?: IconProp
        color?: string
    }[]
}

const CustomCard = (props: CustomProps) => {
    const {
        img,
        time,
        description,
        title,
        author,
        className,
        tag = [],
        ...otherProps
    } = props

    const [visible, setVisible] = useState(false)

    const theme = useTheme()

    const handleClickImage = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setVisible(true)
            event.stopPropagation()
        },
        [],
    )

    return (
        <div className='component-ui-card-box'>
            <Card
                bordered
                hoverable
                className={classNames(
                    style.card,
                    style[`card-${theme}`],
                    className,
                )}
                {...otherProps}
            >
                <Image
                    src={img}
                    className={style.image}
                    preview={{ visible: false }}
                    onClick={handleClickImage}
                />

                <div className={style.content}>
                    <Text className={style.title}>{title}</Text>

                    <Text className={style.description}>{description}</Text>

                    <div className={style.info}>
                        <div>
                            <FontAwesomeIcon
                                icon='user'
                                className={style.author}
                            />
                            <Text>{author}</Text>
                        </div>
                        <div>
                            <FontAwesomeIcon
                                icon='clock'
                                className={style.time}
                            />
                            <Text>{time}</Text>
                        </div>
                    </div>

                    <div className={style.tags}>
                        {tag.map((tag, index) => {
                            const { name, key, icon, color } = tag

                            return (
                                <Tag
                                    className={style.tag}
                                    key={key ?? index}
                                    color={
                                        theme === 'light'
                                            ? color
                                            : invertColor(color ?? '#55acee')
                                    }
                                    icon={
                                        icon ? (
                                            <FontAwesomeIcon
                                                icon={icon}
                                                style={{ marginRight: '5px' }}
                                            />
                                        ) : null
                                    }
                                >
                                    {name}
                                </Tag>
                            )
                        })}
                    </div>
                </div>
            </Card>

            <div className={style.preview}>
                <Image.PreviewGroup
                    preview={{
                        visible,
                        maskClosable: false,
                        onVisibleChange: (vis) => setVisible(vis),
                    }}
                >
                    <Image src={img} />
                </Image.PreviewGroup>
            </div>
        </div>
    )
}

export default memo(CustomCard)
