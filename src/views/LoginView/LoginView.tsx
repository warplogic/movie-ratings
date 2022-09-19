import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Navigate } from "react-router-dom"

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { asyncLogin, currentUser, logout } from '../../redux/slices/authSlice'

const LoginView = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useAppDispatch()
    const user = useAppSelector(currentUser)

    if (user) {
        return <Navigate to="/" />
    }

    const updateEmail = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setEmail(event.target.value)
    }

    const updatePassword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setPassword(event.target.value)
    }

    const tryLogin = () => {
       dispatch(asyncLogin({ email, password }))
    }

    const tryLogout = () => {
        dispatch(logout())
    }

    return (
        <Box component="div" sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '20px' }}>
            <Box sx={{ height: '40%', width: '100%', backgroundColor: '#343a40', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }} >
                <Typography variant="h4" gutterBottom>Login</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField onChange={updateEmail} label="Email" variant="outlined" sx={{ marginBottom: '8px' }} />
                    <TextField onChange={updatePassword} label="Password" variant="outlined" type="password" />
                </Box>
                <Button onClick={tryLogin} variant="contained" sx={{ backgroundColor: '#099268' }}>Login</Button>
                <Button onClick={tryLogout} variant="contained" sx={{ backgroundColor: '#099268' }}>Logout</Button>
            </Box>
        </Box>
    )
}
    
export default LoginView
