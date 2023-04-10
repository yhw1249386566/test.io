import { memo } from 'react'
import _ from 'lodash'
import { history } from 'umi'

import { Card } from '@/component'

import { ArticleCardListItem } from './index.d'
import { ArticleCardList } from './data'
import style from './index.less'

// e.g. articlePath: css/定位, js/js设计模式, js/promise/promise的使用
function handleGotoArticle(articlePath: string) {
    return () => {
        history.push(`/article/${articlePath}`)
    }
}

function Article() {
    return (
        <div className={style.article}>
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
