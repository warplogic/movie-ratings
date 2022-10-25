import { useState, useEffect } from 'react'
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Input } from "@mui/material"
import SyncIcon from '@mui/icons-material/Sync'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ListIcon from '@mui/icons-material/List'
import AddIcon from '@mui/icons-material/Add'
import { createNewList, getAllLists, List as ListType } from '../../firebase/queries'

interface SideMenuProps {
    isOpen: boolean,
    toggle: (event: React.KeyboardEvent | React.MouseEvent) => void
}

const SideMenu = ({ isOpen, toggle }: SideMenuProps) => {
    const [refreshing, setRefreshing] = useState(true)
    const [newListLabel, setNewListLabel] = useState('');
    const [listElements, setListElements] = useState<ListType[]>([])

    useEffect(() => {
        if (refreshing === true) (refreshLists)()
    }, [refreshing])

    const changeNewListLabel = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setNewListLabel(event.target.value)
    }

    const addNewListHandler = (): void => {
        createNewList(newListLabel)
        setNewListLabel('')
        setRefreshing(true)
    }

    const refreshLists = async (): Promise<void> => {
        const data = await getAllLists()
        setListElements(data)
        setRefreshing(false)
    }

    return (
        <Drawer anchor="left" open={isOpen} onClose={toggle}>
            <Box sx={{ width: 250, height: '100%', backgroundColor: '#343a40', color: '#FFF' }}>
                <List>
                    {listElements.map((list, _) => (
                            <ListItem key={list.label} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {/*index === 0 ? <TaskAltIcon sx={{ color: '#FFF' }} /> : index === 1 ? <SyncIcon sx={{ color: '#FFF' }} /> : <ListIcon sx={{ color: '#FFF' }} />*/}
                                        <ListIcon sx={{ color: '#FFF' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={list.label} />
                                </ListItemButton>
                            </ListItem>
                    ))}
                    <ListItem>
                        <TextField onChange={changeNewListLabel} value={newListLabel} sx={{ label: { display: 'none' }, input: { backgroundColor: '#fff' } }} label="New List Title" size="small" variant="filled" hiddenLabel InputProps={{ disableUnderline: true }} />
                        <Button onClick={addNewListHandler} sx={{ height: 40, width: 42, minWidth: 0,  backgroundColor: '#099268' }} variant="contained">
                            <AddIcon sx={{ color: '#FFF' }} />
                        </Button>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}

export default SideMenu
