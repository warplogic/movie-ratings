import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { attemptSignIn } from '../../firebase/auth'

export interface ILoginParameters {
    email: string,
    password: string
}

interface AuthState {
    token: string
}

const initialState: AuthState = {
    token: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        attemptLogin: (state, action: PayloadAction<ILoginParameters>) => {
            attemptSignIn(action.payload.email, action.payload.password)
        }
    },
    extraReducers(builder) {
        //builder
        //    .addCase(fetchAllMovies.pending, (state, action: PayloadAction<any>) => {
        //        state.status = 'fetchAll:loading'
        //    })
    }
})

export const { attemptLogin } = authSlice.actions

//export const selectAllMovies = (state: RootState) => state.movies.movies

export default authSlice.reducer

//export const fetchAllMovies = createAsyncThunk<any, void, { state: RootState }>('movies/get', async (_, { getState }) => {
//    try {
//        const { movies } = getState()
//        const response = await fetch(`${import.meta.env.VITE_API_URL}&s=${encodeURIComponent(movies.searchTerm)}`)
//        const body = await response.json()
//        return body
//    } catch (error) {
//        console.log(error)
//    }
//})
