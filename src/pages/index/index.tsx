import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { faClock, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { useRouteMatch, useLocation } from 'umi'

import { Card } from '@/component'
import style from './index.less'
import content from '../../../../../own/privatenotes/1_front_end/0_base/JS设计模式/设计模式.md'

export default function Index(props) {
    const match = useRouteMatch()
    console.log('__match', match, useLocation())

    return (
        <div className={style.index} style={{ padding: 50 }}>
            {/* {props.children} */}
            <Card
                title='Animation'
                text='动画的存在是存在关键帧的前提动画的存在是存在关键帧的前提动画的存在是存在关键帧的前提动画的存在是存在关键帧的前提,即:关键帧是定义在动画中的动画的存在是存在关键帧的前提,即:关键帧是定义在动画中的动画的存在是存在关键帧的前提,即:关键帧是定义在动画中的'
                author='Yomua'
                time='2020年6月22日'
                img='https://i.niupic.com/images/2022/03/08/9W7A.jpg'
                tag={[
                    { name: 'CSS', icon: faClock, color: '#ee7959' },
                    {
                        name: '设计模式',
                        icon: faUserAstronaut,
                        color: '#ecb0c1',
                    },
                ]}
                // onClick={}
            />
            <Card
                title='Animation'
                text='动画的的'
                author='Yomua'
                time='2020年6月22日'
                img='https://i.niupic.com/images/2022/03/08/9W7A.jpg'
            />
        </div>
    )
}

// <ReactMarkdown
// /* eslint-disable react/no-children-prop */
// children={content}
// components={{
//     code({ node, inline, className, children, ...props }) {
//         const match = /language-(\w+)/.exec(className || '')
//         return !inline && match ? (
//             <SyntaxHighlighter
//                 children={String(children).replace(/\n$/, '')}
//                 style={dark}
//                 language={match[1]}
//                 PreTag='div'
//                 {...props}
//             />
//         ) : (
//             <code className={className} {...props}>
//                 {children}
//             </code>
//         )
//     },
// }}
// /* eslint-disable react/no-children-prop */
// />
