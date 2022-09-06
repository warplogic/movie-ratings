import { Box, Card, CardActions, CardContent, CardMedia, Typography, Button, Fab } from "@mui/material"
import BackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { setMovie } from '../../redux/slices/moviesSlice'
import { useNavigate } from 'react-router-dom'

const DetailsView = () => {
    const { movies } = useAppSelector((state) => state.movies)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleBack = () => navigate(-1)

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
                    image="https://assets-prd.ignimgs.com/2022/08/16/better-call-saul-hero-1660667483204.jpg?width=1920"
                    alt="bcs"
                />
                <CardContent sx={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box component="div" sx={{ display: 'flex', alignItems: 'end' }}>
                            <Typography sx={{ mr: '8px' }} variant="h4" component="div">
                                Movie Title
                            </Typography>
                            <Typography sx={{ color: 'gray', lineHeight: 1.7 }} variant="h6" component="div">
                                2017
                            </Typography>
                        </Box>
                        <Button onClick={() => dispatch(setMovie())} variant="contained" size="small" startIcon={<AddIcon />} sx={{ backgroundColor: '#63e6be' }}>Add</Button>
                    </Box>
                    {/*<Typography variant="body2">
                        Some kind of description
                    </Typography>*/}
                </CardContent>
            </Card>
        </Box>
    )
}

export default DetailsView
