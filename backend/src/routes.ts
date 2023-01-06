import express from 'express';
import { getProduct } from './services/controller';

const router = express.Router();

router.get('/product', getProduct);

export default router;
