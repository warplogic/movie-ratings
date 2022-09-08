import { ListItem, ListItemAvatar, Avatar, ListItemText, Divider, ListItemButton} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { fetchMovieDetails } from '../../redux/slices/moviesSlice'

interface LibraryItemProps {
    hideDivider?: boolean,
    title: string,
    year: string,
    poster: string,
    imdbId: string
}

const LibraryItem = ({ hideDivider, title, year, poster, imdbId }: LibraryItemProps) => {
    const dispatch = useAppDispatch()

    const handleItemClick = () => {
        console.log('item clicked')
        dispatch(fetchMovieDetails(imdbId))
    }

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={handleItemClick} component={Link} to={`/details/${imdbId}`}>
                    <ListItemAvatar>
                        <Avatar src={poster} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={title}
                        secondary={year}
                        primaryTypographyProps={{ sx: { color: '#FFF' } }}
                        secondaryTypographyProps={{ sx: { color: '#868e96' } }}
                    />
                </ListItemButton>
            </ListItem>
            {hideDivider || <Divider />}
        </>
    )
}

export default LibraryItem
