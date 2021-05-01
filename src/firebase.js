import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAPQ7ThWukMM7CIU5GwArdju6YX8KohHL8",
    authDomain: "currencies-4d648.firebaseapp.com",
    projectId: "currencies-4d648",
    storageBucket: "currencies-4d648.appspot.com",
    messagingSenderId: "403905980571",
    appId: "1:403905980571:web:0a7c82c1ac7c6e687cbe3e",
    measurementId: "G-EN6EBF9K1S"
};

firebase.initializeApp(firebaseConfig);

export default firebase;