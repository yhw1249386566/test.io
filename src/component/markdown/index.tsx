/* eslint-disable react/no-children-prop */
import { memo } from 'react'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import MarkNavbar from 'markdown-navbar'
import ReactMarkdown from 'react-markdown'

import classnames from '~/packages/classnames'

import style from './index.less'
import 'github-markdown-css'
import './base.css'

type MarkdownProps = {
    children: React.ReactNode | string
}

const Markdown = (props: MarkdownProps) => {
    const { children } = props

    return (
        <div className={style.markdown}>
            <div className={style.markNavbarBox}>
                <MarkNavbar
                    className={style.markNavbar}
                    ordered={false}
                    headingTopOffset={40}
                    source={children}
                />
            </div>

            <ReactMarkdown
                // markdown-body 是导入 github-markdown-css
                className={classnames('markdown-body', style.markdownBody)}
                children={children as string}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            />
        </div>
    )
}

export default memo(Markdown)
