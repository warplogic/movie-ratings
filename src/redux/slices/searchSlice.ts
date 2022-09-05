import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export enum SearchType {
    Library = 'LIBRARY',
    Database = 'DATABASE'
}

export interface SearchState {
    type: string
}

const initialState: SearchState = {
    type: SearchType.Library
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        toggle: (state, action: PayloadAction<SearchType>) => {
           if (action.payload === SearchType.Library) {
               state.type = SearchType.Library
           } else if (action.payload === SearchType.Database) {
               state.type = SearchType.Database
           }
        }
    }
})

export const { toggle } = searchSlice.actions
export const selectSearchType = (state: RootState) => state.search.type
export default searchSlice.reducer
