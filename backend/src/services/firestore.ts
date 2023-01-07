import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Request, Response } from 'express';
import { db } from '../index';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
// Add ada lovelace to the collection
export async function addAda(req: Request, res: Response) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
        res.send(docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// add alan turing to the collection
export async function addAlan(req: Request, res: Response) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Alan",
            middle: "Mathison",
            last: "Turing",
            born: 1912
        });
        console.log("Document written with ID: ", docRef.id);
        res.send(docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// get all users
export async function getAllUsers(req: Request, res: Response) {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
        // format to keep only the data
        const data = querySnapshot.docs.map((doc) => doc.data());
        res.send(data);
        // res.send(querySnapshot);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred' });
    }
}
