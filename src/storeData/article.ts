import { createSlice } from '@/store'

export const articleSlice = createSlice({
    name: 'article',
    initialState: {
        searchValue: '',
    },
    reducers: {
        setSearchValue: (state, action) => {
            return {
                searchValue: action.payload,
            }
        },
    },
})

export const { setSearchValue } = articleSlice.actions

export default articleSlice.reducer
