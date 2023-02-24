/* eslint-disable react/no-children-prop */
import { memo } from 'react'
import { useParams, useRouteMatch } from 'umi'
import ReactMarkdown from 'react-markdown'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import { FeatureName } from '../index.d'

import Todo from './todo'
import Gpt3 from './gpt3'
import style from './index.less'

function renderFeature(name: FeatureName) {
    switch (name) {
        case FeatureName.Todo:
            return (
                <div className={style.todoBox}>
                    <Todo />
                </div>
            )

        case FeatureName.Gpt3:
            return <Gpt3 />
        default:
            return <div>Error</div>
    }
}

function Feature() {
    const { name } = useParams() as { name: FeatureName }

    return <div className={style.section}>{renderFeature(name)}</div>
}

export default memo(Feature)
