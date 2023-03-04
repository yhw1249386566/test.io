import { IconProp } from '@fortawesome/fontawesome-svg-core'

import Cute from '@/assets/img/cute.jpeg'

export enum FeatureName {
    Article = 'article',
    Gpt3 = 'gpt3',
    Todo = 'todo',
}

type FeatureType = {
    target: FeatureName
    img?: string
    title?: string
    author?: string
    time?: string
    description?: string
    tag?: {
        name: string
        key?: string
        icon?: IconProp
        color?: string
    }[]
}

export const FeatureList: FeatureType[] = [
    // {
    //     target: FeatureName.Article,
    //     img: Cute,
    //     title: 'Article',
    //     author: 'Yomua',
    //     time: '2023年2月25日',
    //     description: '个人笔记',
    //     tag: [
    //         {
    //             name: 'Article',
    //             color: '#ecb0c1',
    //         },
    //     ],
    // },

    {
        target: FeatureName.Gpt3,
        img: Cute,
        title: 'GPT3',
        author: 'Yomua',
        time: '2023年2月19日 23:22',
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
        img: Cute,
        title: 'Todo',
        author: 'Yomua',
        time: '2023年2月18日',
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
