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

export interface MovieDetails {
    title: string,
    year: string,
    rated: string,
    genre: string,
    director: string,
    writer: string,
    actors: string,
    plot: string,
    poster: string
}

export interface MoviesState {
    movies: Array<SingleMovie>,
    details: MovieDetails,
    searchType: SearchType,
    searchTerm: string,
    status: string,
    error: string
}

const initialState: MoviesState = {
    movies: [],
    details: { title: '', year: '', rated: '', genre: '', director: '', writer: '', actors: '', plot: '', poster: '' },
    searchType: SearchType.API,
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
                state.status = 'fetchAll:loading'
            })
            .addCase(fetchAllMovies.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'fetchAll:success'
                state.movies = action.payload.Search
            })
            .addCase(fetchAllMovies.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'fetchAll:failed'
                //state.error = action.error.message
            })
            .addCase(fetchMovieDetails.pending, (state, action: PayloadAction<any>) => {
                state.status = 'details:loading'
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'details:success'
                state.details = {
                    title: action.payload.Title,
                    year: action.payload.Year,
                    rated: action.payload.Rated,
                    genre: action.payload.Genre,
                    director: action.payload.Director,
                    writer: action.payload.Writer,
                    actors: action.payload.Actors,
                    plot: action.payload.Plot,
                    poster: action.payload.Poster
                }
            })
            .addCase(fetchMovieDetails.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'details:failed'
                //state.error = action.error.message
            })
    }
})

export const { toggleSearchType, updateSearchTerm } = moviesSlice.actions

export const selectAllMovies = (state: RootState) => state.movies.movies
export const selectMovieDetails = (state: RootState) => state.movies.details
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

export const fetchMovieDetails = createAsyncThunk<any, string, { state: RootState }>('movies/details', async (id, { getState }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}&i=${id}`)
        const body = await response.json()
        return body
    } catch (error) {
        console.log(error)
    }
})
