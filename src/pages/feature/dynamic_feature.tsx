/** eslint-disabled */

/** 注意：此文件是 index.tsx 的另一种实现，即：根据 constant/FeatureList 动态加载组件 */

/* eslint-disable react/no-children-prop */
import React, { memo, useState, useEffect, useRef } from 'react'
import { useParams, useRouteMatch } from 'umi'

import { FeatureList, FeatureName } from '../constant'

import Todo from './todo'
import Gpt3 from './gpt3'
import Article from './article'
import style from './index.less'

function renderFeature(name: FeatureName) {
    return React.createElement(name)
}

function Feature() {
    const { name } = useParams() as { name: FeatureName }
    const [_, update] = useState(0)

    const componentRef = useRef<any>(null)

    // 这种方式会造成页面闪烁。
    // 因为第一次加载时没数据，执行了 update() 后才会有数据
    // 且这种动态加载组件的方式，会使得每次进入相同 Feature 时，反复重载此 Feature，不会记忆。
    useEffect(() => {
        async function init() {
            const activeFeature = FeatureList.find(
                (feature) => feature.target === name,
            )

            const component = await import(`./${activeFeature?.target}`)

            componentRef.current = component.default

            update(Date.now())
        }

        init()
    }, [name])

    return (
        <div className={style.section}>
            {componentRef.current && renderFeature(componentRef.current)}
        </div>
    )
}

export default memo(Feature)
