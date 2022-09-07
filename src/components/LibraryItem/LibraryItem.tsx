import { ListItem, ListItemAvatar, Avatar, ListItemText, Divider, ListItemButton} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import { Link } from 'react-router-dom'

interface LibraryItemProps {
    hideDivider?: boolean,
    title: string,
    year: string,
    poster: string,
    imdbId: string
}

const LibraryItem = ({ hideDivider, title, year, poster, imdbId }: LibraryItemProps) => {
    return (
        <>
            <ListItem disablePadding>
                <ListItemButton component={Link} to={`/details/${imdbId}`}>
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
