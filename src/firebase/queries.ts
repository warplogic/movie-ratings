import { app } from './initialise'
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore/lite'
import { SingleMovie } from '../redux/slices/moviesSlice'

export type List = {
    id: string,
    label: string,
    movies?: SingleMovie[]
}

const db = getFirestore(app)

export const getAllLists = async (): Promise<List[]> => {
    let lists: List[] = []
    const querySnapshot = await getDocs(collection(db, "lists"))
    querySnapshot.forEach((doc) => {
        const docData: List = {
            id: doc.id,
            label: doc.data().label,
        }
        lists.push(docData)
    })

    return lists
} 

export const getList = async (listId: string): Promise<List | boolean> => {
    const docSnap = await getDoc(doc(db, "lists", listId))

    if (docSnap.exists()) {
        const docData: List = {
            id: docSnap.id,
            label: docSnap.data().label,
            movies: docSnap.data().movies
        }

        return docData
    } else {
        return false
    }
}

export const createNewList = async (listLabel: string): Promise<void> => {
    await addDoc(collection(db, "lists"), {
        label: listLabel,
        movies: []
    });
}

export const addToList = async (listId: string, movie: SingleMovie): Promise<void> => {
    const listToUpdate = await getList(listId)

    if (listToUpdate) {
        let theList = listToUpdate as List
        theList.movies?.push(movie)
        await setDoc(doc(db, "lists", theList.id), {
            label: theList.label,
            movies: theList.movies
        })
    } else {
        console.log('no list found')
    }
}

export const deleteList = async (listId: string): Promise<void> => {
    await deleteDoc(doc(db, "lists", listId))
}
