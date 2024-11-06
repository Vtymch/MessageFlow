import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAdQgFu65t1BL9f_uhBMboNaq6xgliDX6I',
  authDomain: 'messageflow-5c492.firebaseapp.com',
  projectId: 'messageflow-5c492',
  storageBucket: 'messageflow-5c492.appspot.com',
  messagingSenderId: '1004751037792',
  appId: '1:1004751037792:ios:5ae5b10c293fe04b64ea05',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);

export { db, auth };
