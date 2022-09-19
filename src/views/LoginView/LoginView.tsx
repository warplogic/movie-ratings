import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { attemptLogin } from '../../redux/slices/authSlice'

const LoginView = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useAppDispatch()

    const updateEmail = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setEmail(event.target.value)
    }

    const updatePassword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setPassword(event.target.value)
    }

    const tryLogin = () => {
       dispatch(attemptLogin({ email, password }))
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
            </Box>
        </Box>
    )
}
    
export default LoginView
