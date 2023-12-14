/* eslint-disable react/no-children-prop */
import { memo } from 'react'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import MarkNavbar from 'markdown-navbar'
import ReactMarkdown from 'react-markdown'

import classnames from '~/packages/y-classnames'
import { useTheme } from '@/hooks'

import style from './index.less'
import 'github-markdown-css'
import './base.css'
import './markdown.css'
import './index.less'

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
                style.increaseWeight,
                {
                    [`markdown-${theme}`]: theme,
                },
                className,
            )}>
            <div
                className={classnames(
                    'markdown-body-box',
                    style.markdownBodyBox,
                )}>
                <ReactMarkdown
                    // markdown-body 是导入 github-markdown-css
                    className={classnames('markdown-body', style.markdownBody)}
                    children={children as string}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                />
            </div>

            <div
                className={classnames(
                    'markdown-navbar-box',
                    style.markNavbarBox,
                )}>
                <MarkNavbar
                    className={style.markNavbar}
                    ordered={false}
                    headingTopOffset={40}
                    source={children}
                />
            </div>
        </div>
    )
}

export default memo(Markdown)
