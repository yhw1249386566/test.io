/* eslint-disable react/no-children-prop */
import { memo } from 'react'
import { useParams } from 'umi'
import ReactMarkdown from 'react-markdown'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import Todo from './todo'
import style from './index.less'

enum FunctionName {
    Todo = 'todo',
}

function renderFunctionComponent(name: FunctionName) {
    switch (name) {
        case FunctionName.Todo:
            return (
                <div className={style.todo}>
                    <Todo />
                </div>
            )
        default:
            return <div>Error</div>
    }
}

function Article() {
    const { name } = useParams() as { name: FunctionName }
    
    console.log('function_name', name)

    return (
        <div className={style.section}>
            {renderFunctionComponent(name)}

            {/* <ReactMarkdown
                // .md 文件
                children={designPatterns}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={dark}
                                language={match[1]}
                                PreTag='div'
                                {...props}
                            />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    },
                }}
            /> */}
        </div>
    )
}

export default memo(Article)
