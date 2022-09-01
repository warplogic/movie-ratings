import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import SyncIcon from '@mui/icons-material/Sync'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ListIcon from '@mui/icons-material/List'

interface SideMenuProps {
    isOpen: boolean,
    toggle: (event: React.KeyboardEvent | React.MouseEvent) => void
}

const listElements: Array<string> = ['Seen', 'In Progress', 'Plan to Watch']

const SideMenu = ({ isOpen, toggle }: SideMenuProps) => {
    return (
        <Drawer anchor="left" open={isOpen} onClose={toggle}>
            <Box sx={{ width: 250, height: '100%', backgroundColor: '#343a40', color: '#FFF' }}>
                <List>
                    {listElements.map((label, index) => (
                            <ListItem key={label} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index === 0 ? <TaskAltIcon sx={{ color: '#FFF' }} /> : index === 1 ? <SyncIcon sx={{ color: '#FFF' }} /> : <ListIcon sx={{ color: '#FFF' }} />}
                                    </ListItemIcon>
                                    <ListItemText primary={label} />
                                </ListItemButton>
                            </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}

export default SideMenu
