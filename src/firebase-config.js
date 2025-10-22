import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3kPHRDHeYd6rjspNjCH11QG7T2bTd7PM",
    authDomain: "stickey-note-6bb95.firebaseapp.com",
    projectId: "stickey-note-6bb95",
    storageBucket: "stickey-note-6bb95.firebasestorage.app",
    messagingSenderId: "266704545369",
    appId: "1:266704545369:web:e403d47f324a91234a3348",
    measurementId: "G-S737QPN1D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to register user
export async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert('User registered:', userCredential.user);
    } catch (error) {
        console.error('Error registering user:', error);
        alert('Error registering user: ' + error.message);
    }
}

// Function to login user
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert('User logged in:', userCredential.user);
        // Load notes for the logged-in user
        getNotesFromFirestore();
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in: ' + error.message);
    }
}

// Function to add note to Firestore
export async function addNoteToFirestore(noteContent) {
    try {
        const docRef = await addDoc(collection(db, "notes"), {
            content: noteContent,
            createdAt: new Date(),
        });
        console.log("Note added with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding note: ", e);
    }
}

// Function to get notes from Firestore
export async function getNotesFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "notes"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}
