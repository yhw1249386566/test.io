/* eslint-disable react/no-children-prop */
import { memo } from 'react'
import 'github-markdown-css'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'
import classnames from '@yomua/y-classnames'

import { useTheme } from '@/hooks'

import './markdown.css'
import style from './index.less'

type MarkdownProps = {
    children: React.ReactNode | string
    className?: string
}

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
                // markdown-body 是导入 github-markdown-css
                className={classnames('markdown-body', style.markdownBody)}
                children={children as string}
                // 即使手动引入了 markdown.css 这两个也有用, 至少表格相关的样式需要。
                remarkPlugins={[remarkGfm]}
                // 这个不会影响到表格样式，但可能会影响其他样式，所以保留
                rehypePlugins={[rehypeRaw]}
            />
        </div>
    )
}

export default memo(Markdown)
