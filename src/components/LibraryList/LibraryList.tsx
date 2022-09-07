import { List } from '@mui/material'
import LibraryItem from '../LibraryItem'
import { useAppSelector } from '../../redux/hooks'
import { selectAllMovies, SingleMovie } from '../../redux/slices/moviesSlice'

const LibraryList = () => {
    const movies: Array<SingleMovie> = useAppSelector(selectAllMovies)
    return (
        <List sx={{ width: '100%' }}>
            {movies.map((movie, index) => (
                <LibraryItem key={index} title={movie.Title} year={movie.Year} poster={movie.Poster} imdbId={movie.imdbID} />
            ))}
        </List>
    )
}

export default LibraryList
