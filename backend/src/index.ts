import express from 'express';
import cors from 'cors';
import router from './routes';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from './firebase_config';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const db = getFirestore(app);
// export const analytics = getAnalytics(app);

const server = express();
const port = 5000;

server.use(cors());
server.use('/api', router);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
