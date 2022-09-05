import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface SingleMovie {
    name: string
}

export interface MoviesState {
    movies: Array<SingleMovie>
}

const initialState: MoviesState = {
    movies: []
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovie: (state) => {
            state.movies = [{name: 'test'}]
        }
    }
})

export const { setMovie } = moviesSlice.actions
export const selectMovies = (state: RootState) => state.movies.movies
export default moviesSlice.reducer
