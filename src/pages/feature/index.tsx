/* eslint-disable react/no-children-prop */
import { ReactNode, memo } from 'react'
import { useLocation, useParams } from 'umi'

import Error404 from '@/pages/404'

import { FeatureName } from '../constant'

import Todo from './todo'
import Gpt3 from './gpt3'
import Article from './article'
import Three from './three'
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
    //  name.startsWith(FeatureName.Article) => 我们将路由模式改成了 history,
    // 且让 article 页面地址友好的显示为: https://www.whyhw.com/feature/article/xxx.md
    // 所以为了当用户访问类似地址时可以链接到 Article 组件, 于是这里采用了模糊匹配 startWidth
    if (pathname.includes('heading') || name.startsWith(FeatureName.Article)) {
        return <Article />
    }

    switch (name) {
        case FeatureName.Three:
            return <Three />

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
