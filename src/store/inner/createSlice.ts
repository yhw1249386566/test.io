import store from '../store'
import { Action, Reducer } from '../index.d'

type SliceOptions = {
    name: string
    initialState: Record<string, any>
    reducers: Record<string, Reducer>
    // extraReducers?: object
    // caseReducers?: object
    // extraArgument?: object
    // reducerPath?: string
    // middleware?: object
    // devTools?: object
    // enhancers?: object
    // preloadedState?: object
}

// 对用户定义的 reducers 进行代理
// 当用户调用代理的 reducer 时，会经过这一层, 返回一个 Action, 再被用户使用 -> dispatch(Action)
function getProxyActions(
    scopeName: SliceOptions['name'],
    reducers: SliceOptions['reducers'],
) {
    // 例如: { reducerName:()=>{} }
    const proxyReducers: Record<string, (payload: any) => Action> = {}

    for (const fnName in reducers) {
        const type = `${scopeName}/${fnName}` as Action['type']

        store.saveReducer(type, reducers[fnName])

        proxyReducers[fnName] = function (payload: any) {
            return {
                type,
                payload,
            }
        }
    }

    return proxyReducers
}

export default function createSlice(config: SliceOptions) {
    const { name, initialState, reducers } = config

    if (store.getState(name)) {
        throw new Error(`分片 ${name} 已经存在`)
    }

    store.saveState(name, initialState)

    const actions = getProxyActions(name, reducers)

    // const reducer = (state = initialState, action) => {
    //     return reducers[action.type]
    //         ? reducers[action.type](state, action)
    //         : state
    // }

    return {
        actions,
        reducer: {},
    }
}
