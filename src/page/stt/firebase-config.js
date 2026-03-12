import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCOBhUtS3rs6Q5ICcHU6HfGd9l8mHjImRQ",
    authDomain: "fir-tt-50b78.firebaseapp.com",
    projectId: "fir-tt-50b78",
    storageBucket: "fir-tt-50b78.firebasestorage.app",
    messagingSenderId: "769240928459",
    appId: "1:769240928459:web:f403c27afc3e4b61848b4e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);