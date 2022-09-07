import { useState } from 'react'
import { AppBar, Box, Icon, IconButton, InputBase, TextField, ToggleButton, ToggleButtonGroup, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import BookIcon from '@mui/icons-material/Book'
import VideoIcon from '@mui/icons-material/VideoCall'
import SearchIcon from '@mui/icons-material/Search'
import SideMenu from '../SideMenu'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { toggleSearchType, SearchType, selectSearchType, selectSearchTerm, updateSearchTerm, fetchAllMovies } from '../../redux/slices/moviesSlice'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const searchType = useAppSelector(selectSearchType)
    const searchTerm = useAppSelector(selectSearchTerm)
    const dispatch = useAppDispatch()

    const toggleMenu = (event: React.KeyboardEvent | React.MouseEvent): void => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return
        }

        setMenuOpen(false)
    }

    const changeSearchType = (event: React.MouseEvent, value: SearchType): void => {
        if (value !== null) {
            dispatch(toggleSearchType(value))
        }
    }

    const changeSearchTerm = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        dispatch(updateSearchTerm(event.target.value))
    }

    const doSearch = (event: React.MouseEvent | React.KeyboardEvent) => {
        if (event.type !== 'click' && (event as React.KeyboardEvent).key !== 'Enter') return
        dispatch(fetchAllMovies())
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, top: 0 }}>
                <AppBar position="fixed" sx={{ backgroundColor: '#099268' }}>
                    <Toolbar sx={{ p: '6px 12px',display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" aria-label="menu" sx={{ p: '10px' }} onClick={() => setMenuOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                        <InputBase onKeyUp={doSearch} value={searchTerm} onChange={changeSearchTerm} sx={{ padding: 0, ml: 2, flex: 1, color: "#FFF" }} placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
                        <IconButton onClick={doSearch} sx={{ mr: 1 }} aria-label="search">
                           <SearchIcon sx={{ color: '#FFF' }} /> 
                        </IconButton>
                        <ToggleButtonGroup
                            value={searchType}
                            exclusive
                            onChange={changeSearchType}
                            aria-label="search type"
                        >
                            <ToggleButton value={SearchType.Library} aria-label="my library search">
                                <BookIcon sx={{ color: '#FFF' }} />
                            </ToggleButton>
                            <ToggleButton value={SearchType.API} aria-label="database search">
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
