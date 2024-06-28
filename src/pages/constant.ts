import { IconProp } from '@fortawesome/fontawesome-svg-core'

import ARTICLE_DIR from '@/article_dir.js'

import Cute from '@/assets/img/cute.jpeg'
import CompressCute from '@/assets/img/compress_cute.jpeg'
import { ARTICLE_COMMIT_LAST_DATE } from '@/utils/constant'
console.log('🚀 ~ ARTICLE_COMMIT_LAST_DATE:', ARTICLE_COMMIT_LAST_DATE)

export enum FeatureName {
    Three = 'three',
    Article = 'article',
    Gpt3 = 'gpt3',
    Todo = 'todo',
}

type FeatureType = {
    target: FeatureName
    img?: string
    previewImg?: string
    title?: string
    author?: string
    time?: string
    description?: string
    lastUpdateTime?: string
    tag?: {
        name: string
        key?: string
        icon?: IconProp
        color?: string
    }[]
}

export const FeatureList: FeatureType[] = [
    // {
    //     target: FeatureName.Three,
    //     img: CompressCute,
    //     previewImg: Cute,
    //     title: 'Three',
    //     author: 'Yomua',
    //     time: '2023年08月22日',
    //     description: 'Three.js',
    //     tag: [
    //         {
    //             name: 'Three',
    //             icon: 'cube',
    //             color: '#ecb0c1',
    //         },
    //     ],
    // },

    {
        target: FeatureName.Article,
        img: CompressCute,
        previewImg: Cute,
        title: 'Article',
        author: 'Yomua',
        time: '2023年02月25日',
        description: '个人笔记',
        lastUpdateTime: ARTICLE_COMMIT_LAST_DATE,
        tag: [
            {
                name: 'Article',
                color: '#ecb0c1',
            },
        ],
    },

    {
        target: FeatureName.Gpt3,
        img: CompressCute,
        previewImg: Cute,
        title: 'GPT3',
        author: 'Yomua',
        time: '2023年02月19日 23:22',
        description: 'gpt3 chat',
        tag: [
            {
                name: 'Open AI',
                icon: 'earth-americas',
                color: '#ecb0c1',
            },
            {
                name: 'Chat Gpt',
                icon: 'brain',
                color: '#ecb0c1',
            },
            {
                name: 'Gpt3',
                icon: 'certificate',
                color: '#ecb0c1',
            },
        ],
    },
    {
        target: FeatureName.Todo,
        img: CompressCute,
        previewImg: Cute,
        title: 'Todo',
        author: 'Yomua',
        time: '2023年02月18日',
        description: '一个来自远古的待办事项',
        tag: [
            {
                name: 'Todo',
                icon: 'bars',
                color: '#ecb0c1',
            },
        ],
    },
]

export const DEFAULT_EXPANDED_KEYS = ARTICLE_DIR ? Object.keys(ARTICLE_DIR) : []
