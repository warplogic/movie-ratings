import { app } from './initialise'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

const db = getFirestore(app)
