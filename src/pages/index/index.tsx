import { memo } from 'react'
import _ from 'lodash'
import { useRouteMatch, history } from 'umi'

import { Card } from '@/component'

import { FeatureList } from './data'
import style from './index.less'

function handleGotoFeature(featureName: string) {
    return () => {
        history.push(`/feature/${featureName}`)
    }
}

function Index() {
    const match = useRouteMatch()

    return (
        <div className={style.index} style={{ padding: 50 }}>
            {_.orderBy(FeatureList, 'time', 'desc').map((card, index) => {
                const { target, img, title, author, time, description, tag } =
                    card

                return (
                    <Card
                        key={`${index}-${time}`}
                        tag={tag}
                        img={img}
                        time={time}
                        title={title}
                        author={author}
                        description={description}
                        onClick={handleGotoFeature(target)}
                    />
                )
            })}
        </div>
    )
}

export default memo(Index)
