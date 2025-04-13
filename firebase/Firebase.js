// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDbm0F39ZUfV32Wqg4VYNfGgaTdhMy0hmE",
    authDomain: "credencial-utc.firebaseapp.com",
    projectId: "credencial-utc",
    storageBucket: "credencial-utc.firebasestorage.app",
    messagingSenderId: "577550428491",
    appId: "1:577550428491:web:fcac370e847952329ba0ce"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar las variables
export { app, db };
