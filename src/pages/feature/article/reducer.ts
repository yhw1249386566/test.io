import storage from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/utils/constant'

import { Action } from './types.d'

export const initialState = {
    articleLoading: false,
    showSearchPanel: false,
    isOpenDirectoryOnlyArticle: false,
    markdownData: '',
    // 如果重复点击一样的目录, 则不再重新加载数据
    prevSelectedFilePath: '',
    // 点击 .md 文件, 得到完整的 key =>  D:/code/yomua/public/article/0_base/函数式编程/函数式编程.md
    selectedKey: '',
    expandedKeys: [],
}

export default function reducer(state: typeof initialState, action: Action) {
    if (action.type === 'setMarkdownData') {
        return {
            ...state,
            markdownData: action.payload,
        }
    }

    if (action.type === 'setArticleLoading') {
        return {
            ...state,
            articleLoading: action.payload,
        }
    }

    if (action.type === 'setExpandedKeys') {
        return {
            ...state,
            expandedKeys: action.payload,
        }
    }

    if (action.type === 'setPrevSelectedFilePath') {
        return {
            ...state,
            prevSelectedFilePath: action.payload,
        }
    }

    if (action.type === 'setSelectedKey') {
        return {
            ...state,
            selectedKey: action.payload,
        }
    }

    if (action.type === 'setShowSearchPanel') {
        return {
            ...state,
            showSearchPanel: action.payload,
        }
    }

    if (action.type === 'setIsOpenDirectoryOnlyArticle') {
        return {
            ...state,
            isOpenDirectoryOnlyArticle: action.payload,
        }
    }

    return state
}
