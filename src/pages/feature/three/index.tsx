import { Suspense, lazy, memo, useState } from 'react'

import { Card, Loading } from '@/component'
import Cute from '@/assets/img/cute.jpeg'

const ThreeCard = [
    {
        target: '全景看房',
        img: Cute,
        title: '全景看房',
        author: 'Yomua',
        time: '2023年08月23日',
        description: 'Three.js',
        tag: [
            {
                name: '全景看房',
                icon: 'cube',
                color: '#ecb0c1',
            },
        ],
    },
]

function Three() {
    const [name, setName] = useState('')

    function handleGotoFeature(featureName: string) {
        return () => {
            setName(featureName)
        }
    }

    const FeatureComponent = lazy(() => import(`./${name}`))

    const handleBack = () => {
        setName('')
    }

    return (
        <div>
            {name && (
                <>
                    <button onClick={handleBack}>Back</button>
                    <Suspense fallback={<Loading />}>
                        <FeatureComponent />
                    </Suspense>
                </>
            )}

            {!name &&
                ThreeCard.map((card, index) => {
                    const {
                        target,
                        img,
                        title,
                        author,
                        time,
                        description,
                        tag,
                    } = card

                    return (
                        <Card
                            key={`${index}-${time}`}
                            tag={tag as any}
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

export default memo(Three)
