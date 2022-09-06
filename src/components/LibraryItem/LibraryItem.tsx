import { ListItem, ListItemAvatar, Avatar, ListItemText, Divider, ListItemButton} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import { Link } from 'react-router-dom'

interface LibraryItemProps {
    hideDivider?: boolean
}

const LibraryItem = ({ hideDivider }: LibraryItemProps) => {
    return (
        <>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/details/1">
                    <ListItemAvatar>
                        <Avatar>
                           <MovieIcon /> 
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Movie Title"
                        secondary="Short description"
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
