import {initializeApp} from 'firebase/app'
import {serverTimestamp,getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyDyR2kgKaX1NN6ZlXrugRKb8xPJ7kxJ6zI",
    authDomain: "job-publishing.firebaseapp.com",
    projectId: "job-publishing",
    storageBucket: "job-publishing.appspot.com",
    messagingSenderId: "892630040398",
    appId: "1:892630040398:web:63dfe56cb7f4492b6ba81f"
  };

const firebaseApp =initializeApp(firebaseConfig)

const db = getFirestore();
const auth = getAuth()
const storage = getStorage(firebaseApp)

const date = serverTimestamp()

export {db,auth,date,storage}