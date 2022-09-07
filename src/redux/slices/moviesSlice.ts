import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export enum SearchType {
    Library = 'LIBRARY',
    API = 'API'
}

export interface SingleMovie {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string
}

export interface MoviesState {
    movies: Array<SingleMovie>,
    searchType: SearchType,
    searchTerm: string,
    status: string,
    error: string
}

const initialState: MoviesState = {
    movies: [],
    searchType: SearchType.Library,
    searchTerm: '',
    status: '',
    error: ''
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        toggleSearchType: (state, action: PayloadAction<SearchType>) => {
           if (action.payload === SearchType.Library) {
               state.searchType = SearchType.Library
           } else if (action.payload === SearchType.API) {
               state.searchType = SearchType.API
           }
        },
        updateSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllMovies.pending, (state, action: PayloadAction<any>) => {
                state.status = 'loading'
            })
            .addCase(fetchAllMovies.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'success'
                state.movies = action.payload.Search
            })
            .addCase(fetchAllMovies.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed'
                //state.error = action.error.message
            })
    }
})

export const { setMovie, toggleSearchType, updateSearchTerm } = moviesSlice.actions

export const selectAllMovies = (state: RootState) => state.movies.movies
export const selectMovieById = (state: RootState, movieId: number) => state.movies.movies.find(movie => movie.id === movieId)
export const selectSearchType = (state: RootState) => state.movies.searchType
export const selectSearchTerm = (state: RootState) => state.movies.searchTerm

export default moviesSlice.reducer

export const fetchAllMovies = createAsyncThunk<any, void, { state: RootState }>('movies/get', async (_, { getState }) => {
    try {
        const { movies } = getState()
        const response = await fetch(`${import.meta.env.VITE_API_URL}&s=${encodeURIComponent(movies.searchTerm)}`)
        const body = await response.json()
        return body
    } catch (error) {
        console.log(error)
    }
})
