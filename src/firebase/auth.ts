import { app } from './initialise'
import { getAuth, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth'

const auth = getAuth(app)

export const attemptSignIn = async (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const attemptSignOut = () => {
    signOut(auth).then(() => {
        console.log('signed out...')
    })
    .catch((error) => {
        console.log('error signing out...')
    })
}
