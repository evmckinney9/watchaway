import express from 'express';
import { getProduct, helloWorld } from './services/controller';
//import all from firestore.ts
import { addAda, addAlan, getAllUsers, addGeneric } from './services/firestore';
import { queryMovieDB } from './services/movie_db';
import { postMovie, getMovies, clearMovies } from './services/add_movie';

const router = express.Router();

// template defaults
router.get('/', helloWorld);
router.get('/product', getProduct);

//add routes for firestore
router.post('/addAda', addAda);
router.post('/addAlan', addAlan);
router.get('/getAllUsers', getAllUsers);
router.post('/addGeneric', addGeneric);

// movie things to firestore
router.get('/queryMovieDB', queryMovieDB)
router.post('/addMovie', postMovie)
router.get('/getMovies',getMovies)
router.post('/clearMovies',clearMovies)

export default router;
