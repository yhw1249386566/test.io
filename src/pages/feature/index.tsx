/* eslint-disable react/no-children-prop */
import { memo } from 'react'
import { useParams, useRouteMatch } from 'umi'

import { FeatureName } from '../constant'

import Todo from './todo'
import Gpt3 from './gpt3'
import Article from './article'
import style from './index.less'

function renderFeature(name: FeatureName) {
    switch (name) {
        case FeatureName.Article:
            return <Article />

        case FeatureName.Gpt3:
            return <Gpt3 />

        case FeatureName.Todo:
            return (
                <div className={style.todoBox}>
                    <Todo />
                </div>
            )

        default:
            return <div>Error</div>
    }
}

function Feature() {
    const { name } = useParams() as { name: FeatureName }

    return <div className={style.section}>{renderFeature(name)}</div>
}

export default memo(Feature)
