import { useState, useEffect } from 'react'
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Input } from "@mui/material"
import SyncIcon from '@mui/icons-material/Sync'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ListIcon from '@mui/icons-material/List'
import AddIcon from '@mui/icons-material/Add'
import CrossIcon from '@mui/icons-material/Close'
import { createNewList, getAllLists, List as ListType, deleteList } from '../../firebase/queries'

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

    const deleteListHandler = (id: string): void => {
        deleteList(id)
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
                            <ListItem key={list.id} disablePadding>
                                <ListItemButton onClick={() => deleteListHandler(list.id)} sx={{ width: '25%', display: 'flex', justifyContent: 'center' }}>
                                    <ListItemIcon sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <CrossIcon sx={{ color: '#FFF' }} />
                                    </ListItemIcon>
                                </ListItemButton>
                                <ListItemButton sx={{ width: '75%' }}>
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
