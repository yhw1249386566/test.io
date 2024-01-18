import log from '@yomua/y-tlog'

import { EnvValueType, JSValueType } from './utils.d'
import { CONVERT_TYPE_MAP, LOCAL_STORAGE_NAME } from './constant'

type StorageDataKey<KeyType> = { key: KeyType; value: string }

const saveLocalStorage = (
    data: StorageDataKey<LOCAL_STORAGE_NAME>,
    // config?,
) => {
    const { key, value } = data

    if (!key) {
        log.error('saveLocalStorage key 不存在', key)
        return false
    }

    localStorage.setItem(key, value)

    return true
}

const saveBatchLocalStorage = (data: StorageDataKey<LOCAL_STORAGE_NAME>[]) => {
    data.forEach((item) => {
        const { key, value } = item ?? {}

        if (!key) {
            log.error('saveBatchLocalStorage key 不存在')

            return false
        }

        localStorage.setItem(key, value)
    })

    return true
}

const getLocalStorage = <
    ReturnType extends JSValueType = 'string',
    DataType = string,
>(
    key: LOCAL_STORAGE_NAME,
    options?: { returnType?: ReturnType },
): EnvValueType<ReturnType, DataType> => {
    if (!key) {
        log.error('getLocalStorage: key 不存在')
        return '' as EnvValueType<ReturnType, DataType>
    }

    const { returnType = 'string' } = options ?? {}

    const converter = CONVERT_TYPE_MAP[returnType]

    return converter(localStorage.getItem(key) ?? '') as EnvValueType<
        ReturnType,
        DataType
    >
}

const clearLocalStorage = (key: LOCAL_STORAGE_NAME) => {
    if (!key) {
        log.error('clearLocalStorage: key 不存在')
        return false
    }

    localStorage.removeItem(key)

    return true
}

const clearAllLocalStorage = () => {
    localStorage.clear()
    return true
}

const saveSessionStorage = (
    data: StorageDataKey<string>,
    // config?,
) => {
    const { key, value } = data

    if (!key) {
        log.error('saveSessionStorage: key 不存在')
        return
    }

    sessionStorage.setItem(key, value)
}

const getSessionStorage = (key: string) => {
    if (!key) {
        log.error('getSessionStorage: key 不存在')
        return ''
    }

    return sessionStorage.getItem(key) ?? ''
}

export default {
    // localStorage
    saveLocalStorage,
    saveBatchLocalStorage,
    getLocalStorage,
    clearLocalStorage,
    clearAllLocalStorage,

    // sessionStorage
    saveSessionStorage,
    getSessionStorage,
}
