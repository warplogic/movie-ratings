import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './slices/moviesSlice';
import searchSlice from './slices/searchSlice';

export const store = configureStore({
    reducer: {
        movies: moviesSlice,
        search: searchSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
