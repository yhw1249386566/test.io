import { memo, useEffect } from 'react'
import _ from 'lodash'
import { history } from 'umi'

import { Card, Markdown } from '@/component'
import md from '@/article/css/基本类型(原始类型).md'

import { ArticleCardListItem } from './index.d'
import { ArticleCardList } from './data'
import style from './index.less'

import articleData from '@/articleData'

// e.g. articlePath: css/定位, js/js设计模式, js/promise/promise的使用
function handleGotoArticle(articlePath: string) {
    return () => {
        history.push(`/article/${articlePath}`)
    }
}

function Article() {
    useEffect(() => {
        async function getData() {}
        getData()
    }, [])

    console.log('__articleData', articleData)

    return (
        <div className={style.article}>
            {/* <Markdown children={md} /> */}

            {_.orderBy(ArticleCardList, 'time', 'desc').map(
                (card: ArticleCardListItem, index: number) => {
                    const {
                        target,
                        img,
                        title,
                        author,
                        time,
                        description,
                        tag,
                    } = card

                    return (
                        <Card
                            key={`${index}-${time}`}
                            tag={tag}
                            img={img}
                            time={time}
                            title={title}
                            author={author}
                            description={description}
                            onClick={handleGotoArticle(target)}
                        />
                    )
                },
            )}
        </div>
    )
}

export default memo(Article)
