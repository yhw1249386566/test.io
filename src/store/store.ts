/* eslint-disable */
import { Action, Reducer } from './index.d'

// 全局存储
class Store {
    static instance: Store
    private reducerMap: Record<Action['type'], Function>
    private stateMap: Record<Action['type'], any>

    constructor() {
        this.reducerMap = {}
        this.stateMap = {}
    }

    static get singleInstance() {
        if (!this.instance) {
            this.instance = new Store()
        }

        return this.instance
    }

    // 暂存 reducer
    saveReducer(type: Action['type'], reducer: Function) {
        this.reducerMap[type] = reducer
    }

    getReducer(type: Action['type']) {
        return this.reducerMap[type] as Reducer
    }

    saveState(type: string, state: any) {
        this.stateMap[type] = state
    }

    getState(type: string) {
        return this.stateMap[type]
    }

    get reducers() {
        return this.reducerMap
    }

    get states() {
        return this.stateMap
    }
}

export default Store.singleInstance
