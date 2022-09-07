import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './App.css'

import { Box } from '@mui/material'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import LibraryView from './views/LibraryView'
import DetailsView from './views/DetailsView'

function App() {
    return (
        <Router>
            <Box component="div" className="app">
                <Routes>
                    <Route path="/" element={<LibraryView />} />
                    <Route path="/details/:id" element={<DetailsView />} />
                </Routes>
            </Box>
        </Router>
    )
}

export default App
