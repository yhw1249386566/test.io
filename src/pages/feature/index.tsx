/* eslint-disable react/no-children-prop */
import { ReactNode, memo } from 'react'
import { useLocation, useParams } from 'react-router'
import { Location } from 'history'

import Error404 from '@/pages/404'

import { FeatureName } from '../constant'

import Todo from './todo'
import Gpt3 from './gpt3'
import Article from './article'
import style from './index.less'

function renderFeature(
    name: FeatureName,
    options: {
        location: Location
    },
): ReactNode {
    const {
        location: { pathname = '' },
    } = options ?? {}

    // 说明当前路由是 feature/article 的标题，就重定向回去
    if (pathname.includes('heading')) {
        return <Article />
    }

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
    const location = useLocation()

    return (
        <div className={style.section}>{renderFeature(name, { location })}</div>
    )
}

export default memo(Feature)
