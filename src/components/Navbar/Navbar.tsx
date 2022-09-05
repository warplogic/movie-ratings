import { useState } from 'react'
import { AppBar, Box, Icon, IconButton, InputBase, TextField, ToggleButton, ToggleButtonGroup, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import BookIcon from '@mui/icons-material/Book'
import VideoIcon from '@mui/icons-material/VideoCall'
import SideMenu from '../SideMenu'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { toggle, SearchType } from '../../redux/slices/searchSlice'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const searchType = useAppSelector((state) => state.search.type)
    const dispatch = useAppDispatch()

    const toggleMenu = (event: React.KeyboardEvent | React.MouseEvent): void => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return
        }

        setMenuOpen(false)
    }

    const changeSearchType = (event: React.MouseEvent, value: SearchType): void => {
        if (value !== null) {
            dispatch(toggle(value))
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, top: 0 }}>
                <AppBar position="fixed" sx={{ backgroundColor: '#099268' }}>
                    <Toolbar sx={{ p: '6px 12px',display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" aria-label="menu" sx={{ p: '10px' }} onClick={() => setMenuOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                        <InputBase sx={{ padding: 0, ml: 2, flex: 1, color: "#FFF" }} placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
                        <ToggleButtonGroup
                            value={searchType}
                            exclusive
                            onChange={changeSearchType}
                            aria-label="search type"
                        >
                            <ToggleButton value={SearchType.Library} aria-label="my library search">
                                <BookIcon sx={{ color: '#FFF' }} />
                            </ToggleButton>
                            <ToggleButton value={SearchType.Database} aria-label="database search">
                                <VideoIcon sx={{ color: '#FFF' }} />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Toolbar>
                </AppBar>
            </Box>
            <SideMenu isOpen={menuOpen} toggle={toggleMenu} />
        </>
    )
}

export default Navbar
