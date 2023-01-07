import express from 'express';
import { getProduct } from './services/controller';
//import all from firestore.ts
import { addAda, addAlan, getAllUsers } from './services/firestore';


const router = express.Router();

router.get('/product', getProduct);
//add routes for firestore
router.post('/addAda', addAda);
router.post('/addAlan', addAlan);
router.get('/getAllUsers', getAllUsers);

export default router;
