import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Request, Response } from 'express';
import { db } from '../index';
import { MovieData } from '../../../../shared/MovieInfo';

// clear movies in db
export async function clearMovies(req: Request, res: Response){

}

// post a new movie into db, MovieData instance passed in body
export async function postMovie(req: Request, res: Response){
    try {
        const movie = req.body.movie;
        const docRef = await addDoc(collection(db, "movies"), movie);
        console.log("Document written with ID: ", docRef.id);
        res.send(docRef.id);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred' });
    }
}

// get all movies in db
export async function getMovies(req: Request, res: Response){
    try {
        const querySnapshot = await getDocs(collection(db, "movies"));
        const movies: MovieData[] = [];
        querySnapshot.forEach((doc) => {
            movies.push(doc.data() as MovieData);
        });
        res.send(movies);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred' });
    }
}
