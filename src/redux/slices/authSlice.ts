import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { attemptSignIn, attemptSignOut } from '../../firebase/auth'

interface ILoginUser {
    uid: string,
    accessToken: string
}

export interface ILoginCredentials {
    email: string,
    password: string
}

interface IAuthState {
    uid: string,
    accessToken: string,
    status: string
}

const initialState: IAuthState = {
    uid: '',
    accessToken: '',
    status: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            attemptSignOut()

            state.uid = ''
            state.accessToken = ''
        }
    },
    extraReducers(builder) {
        builder
            .addCase(asyncLogin.pending, (state, action: PayloadAction<any>) => {
                state.status = 'login:loading'
            })
            .addCase(asyncLogin.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'login:success'
                state.uid = action.payload.uid
                state.accessToken = action.payload.accessToken
            })
            .addCase(asyncLogin.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'login:failed'
            })
    }
})

export const { logout } = authSlice.actions

export const currentUser = (state: RootState) => state.auth.uid

export default authSlice.reducer

export const asyncLogin = createAsyncThunk<ILoginUser, ILoginCredentials, { state: RootState }>('auth/login', async (credentials, { getState }) => {
    try {
        const attempt = await attemptSignIn(credentials.email, credentials.password)
        return {
            uid: attempt.user.uid,
            accessToken: attempt.user.accessToken
        }
    } catch (error) {
        console.log(error)
    }
})
