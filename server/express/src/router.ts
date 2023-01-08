import express from 'express';
import { getProduct, helloWorld } from './services/controller';
//import all from firestore.ts
import { addAda, addAlan, getAllUsers, addGeneric } from './services/firestore';
import { queryMovieDB } from './services/movie_db';

const router = express.Router();


router.get('/', helloWorld);


router.get('/product', getProduct);

//add routes for firestore
router.post('/addAda', addAda);
router.post('/addAlan', addAlan);
router.get('/getAllUsers', getAllUsers);
router.post('/addGeneric', addGeneric);

router.get('/queryMovieDB', queryMovieDB)

export default router;
