import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './App.css'

import { Box } from '@mui/material'
import Navbar from "./components/Navbar"
import LibraryView from './views/LibraryView'
// import DetailsView from './views/DetailsView'

function App() {
  return (
    <Box component="div" className="app">
        <Navbar />
        <Box sx={{ paddingTop: '68px' }}>
            <LibraryView />
        </Box>
        {/*<DetailsView />*/}
    </Box>
  )
}

export default App
