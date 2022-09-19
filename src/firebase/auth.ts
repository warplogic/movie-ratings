import { app } from './initialise'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const auth = getAuth(app)

export const attemptSignIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('USER CREDENTIAL:', userCredential)
            const user = userCredential.user
            console.log('USER:', user)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
        })
}

export const attemptSignOut = () => {
    signOut(auth).then(() => {
        console.log('signed out...')
    })
    .catch((error) => {
        console.log('error signing out...')
    })
}
