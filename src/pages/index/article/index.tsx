/* eslint-disable react/no-children-prop */
import React from 'react'
import { useRouteMatch, useParams } from 'umi'
import ReactMarkdown from 'react-markdown'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import designPatterns from '../../../../../../own/privatenotes/1_front_end/0_base/JS设计模式/设计模式.md'

export default function Article(props) {
    const articleMatch = useRouteMatch()
    const params = useParams()

    console.log('__articleMatch', articleMatch)

    return (
        <div className='className_article'>
            {params.article == 1 && (
                <ReactMarkdown
                    children={designPatterns}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(
                                        /\n$/,
                                        '',
                                    )}
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
                />
            )}
        </div>
    )
}
