import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './slices/moviesSlice'
import authSlice from './slices/authSlice'

export const store = configureStore({
    reducer: {
        movies: moviesSlice,
        auth: authSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
