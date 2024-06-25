/* eslint-disable react/no-children-prop */
import { memo } from 'react'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'
import classnames from '@yomua/y-classnames'
// 语法高亮
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import {
    materialLight as light,
    materialDark as dark,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

import { useTheme } from '@/hooks'

import './markdown.css'
import style from './index.less'

type MarkdownProps = {
    children: React.ReactNode | string
    className?: string
}

SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('bash', bash)

const Markdown = (props: MarkdownProps) => {
    const { className = '', children } = props
    const theme = useTheme()

    return (
        <div
            className={classnames(
                style.markdown,
                {
                    [`markdown-${theme}`]: theme,
                },
                className,
            )}
        >
            <ReactMarkdown
                className={classnames('markdown-body', style.markdownBody)}
                children={children as string}
                // 即使手动引入了 markdown.css, remarkPlugins 和 rehypePlugins 也有用, 至少表格相关的样式需要。
                remarkPlugins={[remarkGfm]}
                // https://github.com/remarkjs/react-markdown?tab=readme-ov-file#appendix-a-html-in-markdown
                // 即: 由于 ReactMarkdown 会转移 .md 中的 html 文件, 这会使得将 .md 转成 html 时增大 html 大小,
                // 所以若你信任 .md 文件, 则使用 rehypeRaw, 它允许你的 html 生效并能减少生成后的 html 大小.
                rehypePlugins={[rehypeRaw]}
                components={{
                    // 对于 .md 文件中的 以 ``` 开头的代码块，会被自动高亮, 如: ```js, ````jsx
                    code(props) {
                        const { children, className, ...rest } = props
                        const match = /language-(\w+)/.exec(className || '')

                        if (match) {
                            return (
                                <SyntaxHighlighter
                                    {...rest}
                                    PreTag='div'
                                    children={`${children}`.replace(/\n$/, '')}
                                    language={match[1]}
                                    style={theme === 'light' ? light : dark}
                                />
                            )
                        }

                        return (
                            <code {...rest} className={className}>
                                {children}
                            </code>
                        )
                    },
                }}
            />
        </div>
    )
}

export default memo(Markdown)
