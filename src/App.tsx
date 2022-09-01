import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './App.css'

import Navbar from "./components/Navbar"
import LibraryView from './views/LibraryView'
import { Box } from '@mui/material'

function App() {
  return (
    <Box component="div" className="app">
        <Navbar />
        <LibraryView />
    </Box>
  )
}

export default App
