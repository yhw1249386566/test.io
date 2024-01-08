import { memo } from 'react'
import { history } from 'umi'

import { Card } from '@/component'

import { FeatureList } from '../constant'

import style from './index.less'

const cache = {}

function handleGotoFeature(featureName: string) {
    if (!cache[featureName]) {
        cache[featureName] = () => {
            history.push(`/feature/${featureName}`)
        }
    }

    return cache[featureName]
}

function Index() {
    return (
        <div className={style.index}>
            {FeatureList.map((card, index) => {
                const {
                    tag,
                    img,
                    time,
                    title,
                    author,
                    target,
                    previewImg,
                    description,
                    lastUpdateTime,
                } = card

                return (
                    <Card
                        key={`${index}-${time}`}
                        tag={tag}
                        img={img}
                        time={time}
                        title={title}
                        author={author}
                        previewImg={previewImg}
                        description={description}
                        lastUpdateTime={lastUpdateTime}
                        onClick={handleGotoFeature(target)}
                    />
                )
            })}
        </div>
    )
}

export default memo(Index)
