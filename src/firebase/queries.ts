import { app } from './initialise'
import { getFirestore, collection, getDocs, doc, setDoc} from 'firebase/firestore/lite'

type Movie = {
    title: string
}

export type List = {
    label: string,
    movies: Array<Movie>
}

const db = getFirestore(app)

export const getAllLists = async (): Promise<List[]> => {
    let lists: List[] = []
    const querySnapshot = await getDocs(collection(db, "lists"))
    querySnapshot.forEach((doc) => {
        const docData: List = {
            label: doc.id,
            movies: doc.data().movies
        }
        lists.push(docData)
    })

    return lists
} 
const getList = () => {}
export const createNewList = async (listLabel: string): Promise<void> => {
    await setDoc(doc(db, "lists", listLabel), {
        movies: []
    });
}
const addToList = () => {}
const deleteList = () => {}
