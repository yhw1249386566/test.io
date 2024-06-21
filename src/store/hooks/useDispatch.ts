import { useState } from 'react'

import store from '../store'
import { Action } from '../index.d'

export default function useDispatch() {
    const [_, setRefresh] = useState({})

    const dispatch = (action: Action) => {
        const { type } = action

        const scopeName = type.split('/')[0]

        const reducer = store.getReducer(type)

        const state = store.getState(scopeName)

        const newState = reducer(state, action)

        store.saveState(scopeName, {
            ...state,
            ...newState,
        })

        setRefresh({})
    }

    return dispatch
}
