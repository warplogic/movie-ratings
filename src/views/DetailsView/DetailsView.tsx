import { Box, Card, CardActions, CardContent, CardMedia, Typography, Button, Fab, Dialog, DialogTitle, DialogContent, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import BackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { selectMovieDetails, SingleMovie } from '../../redux/slices/moviesSlice'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { createNewList, getAllLists, addToList, List as ListType } from '../../firebase/queries'

const DetailsView = () => {
    const [refreshing, setRefreshing] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [newListLabel, setNewListLabel] = useState('');
    const [listElements, setListElements] = useState<ListType[]>([])
    const [listToAddTo, setListToAddTo] = useState('')
    const details = useAppSelector(selectMovieDetails)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (refreshing === true) (refreshLists)()
    }, [refreshing])

    const changeNewListLabel = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setNewListLabel(event.target.value)
    }

    // TODO: Functionality to add list through dialog
    const addNewListHandler = (): void => {
        createNewList(newListLabel)
        setNewListLabel('')
        setRefreshing(true)
    }

    const handleBack = (): void => navigate(-1)

    const openDialogHandler = (): void => {
        setDialogOpen(true)
    }

    const closeDialogHandler = (): void => {
        setDialogOpen(false)
    }

    const listChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListToAddTo((event.target as HTMLInputElement).value);
    };

    const addToListHandler = (): void => {
        let newMovie: SingleMovie = {
            imdbID: details.id,
            Title: details.title,
            Year: details.year,
            Poster: details.poster
        }

       addToList(listToAddTo, newMovie)
       setDialogOpen(false)
    }

    // TODO: Refactor list state data to redux
    const refreshLists = async (): Promise<void> => {
        const data = await getAllLists()
        setListElements(data)
        setRefreshing(false)
    }

    return (
        <Box sx={{ height: '100%' }}>
            <Fab
                onClick={handleBack}
                variant="circular"
                aria-label="back"
                size="small"
                sx={{ position: 'fixed', top: '20px', left: '20px' }}
            >
                <BackIcon />
            </Fab>
            <Card sx={{ height: '100%', backgroundColor: '#343a40', color: '#FFF' }}>
                <CardMedia
                    component="img"
                    height="480"
                    image={details.poster}
                    alt={`${details.title} poster`}
                />
                <CardContent sx={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box component="div" sx={{ display: 'flex', alignItems: 'end' }}>
                            <Typography sx={{ mr: '8px' }} variant="h4" component="div">
                                {details.title} 
                            </Typography>
                            <Typography sx={{ color: 'gray', lineHeight: 1.7 }} variant="h6" component="div">
                                {details.year}
                            </Typography>
                        </Box>
                        <Button onClick={openDialogHandler} variant="contained" size="small" startIcon={<AddIcon />} sx={{ backgroundColor: '#63e6be' }}>Add</Button>
                    </Box>
                    <Typography variant="body2">
                        Description
                    </Typography>
                </CardContent>
            </Card>
            <Dialog open={dialogOpen} onClose={closeDialogHandler}>
                <DialogTitle>Add to a List</DialogTitle>
                <DialogContent dividers>
                    <RadioGroup value={listToAddTo} onChange={listChangeHandler}>
                        {listElements.map((list) => (
                            <FormControlLabel key={list.id} value={list.id} control={<Radio />} label={list.label} />
                        ))}
                    </RadioGroup>
                    <Button onClick={addToListHandler} variant="contained" size="small" sx={{ backgroundColor: '#63e6be' }}>Add</Button>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default DetailsView
