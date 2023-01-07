import { Request, Response } from 'express';
import axios from 'axios';

export const getProduct = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(
            'https://dummyjson.com/products/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        res.send(response.data);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred' });
    }
};