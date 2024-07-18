import { createSlice } from '@yomua/y-simdux'

export const articleSlice = createSlice({
    name: 'article',
    initialState: {
        searchValue: '',
    },
    reducers: {
        setSearchValue: (prevState, action) => {
            return {
                searchValue: action.payload,
            }
        },
    },
})

export const { setSearchValue } = articleSlice.actions

export default articleSlice.reducer
