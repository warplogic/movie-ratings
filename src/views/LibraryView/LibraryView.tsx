import { Box } from '@mui/material'
import LibraryList from "../../components/LibraryList"
import Navbar from '../../components/Navbar'

const LibraryView = () => {
    return (
        <Box sx={{ paddingTop: '68px' }}>
            <Navbar />
            <LibraryList />
        </Box>
    )
}

export default LibraryView
