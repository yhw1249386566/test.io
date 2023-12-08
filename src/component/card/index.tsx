import { memo, useState, useCallback, useEffect } from 'react'
import { Tag, Card, Image, CardProps } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classnames from '~/packages/y-classnames'

import { useTheme } from '@/hooks'
import { invertColor } from '@/utils'

import { Text } from '@/base_component'

import style from './index.less'

interface CustomProps extends CardProps {
    img?: string
    time?: string
    title?: string
    author?: string
    previewImg?: string
    description?: string
    tag?: {
        name: string
        key?: string
        color?: string
        icon?: IconProp
    }[]
}

const CustomCard = (props: CustomProps) => {
    const {
        img,
        previewImg,
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
        <div className={style.cardBox}>
            <Card
                bordered
                hoverable
                className={classnames(
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

                    <Scrollbars style={{ maxHeight: 55 }}>
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
                                                : invertColor(
                                                      color ?? '#55acee',
                                                  )
                                        }
                                        icon={
                                            icon ? (
                                                <FontAwesomeIcon
                                                    icon={icon}
                                                    style={{
                                                        marginRight: '5px',
                                                    }}
                                                />
                                            ) : null
                                        }
                                    >
                                        {name}
                                    </Tag>
                                )
                            })}
                        </div>
                    </Scrollbars>
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
                    <Image src={previewImg} />
                </Image.PreviewGroup>
            </div>
        </div>
    )
}

export default memo(CustomCard)
