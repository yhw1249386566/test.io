import Cute from '@/assets/img/cute.jpeg'

import { ArticleCardListItem } from './index.d'

// 添加枚举值： src/article 中文件的路径
export enum ArticleList {
    Position = 'css/定位',
}

export const ArticleCardList: ArticleCardListItem[] = [
    {
        target: ArticleList.Position,
        img: Cute,
        title: ArticleList.Position,
        author: 'Yomua',
        time: '2023年2月26日 01:38',
        description: '个人笔记',
        tag: [
            {
                name: 'Article',
                color: '#ecb0c1',
            },
        ],
    },
]
