/* eslint-disable react/no-children-prop */
import { ReactNode, memo } from 'react'
import { useParams } from 'umi'

import Error404 from '@/pages/404'

import { FeatureName } from '../constant'

import Todo from './todo'
import Gpt3 from './gpt3'
import Article from './article'
import style from './index.less'

function renderFeature(name: FeatureName): ReactNode {
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
            return <Error404 />
    }
}

function Feature() {
    const { name } = useParams() as { name: FeatureName }

    return <div className={style.section}>{renderFeature(name)}</div>
}

export default memo(Feature)
