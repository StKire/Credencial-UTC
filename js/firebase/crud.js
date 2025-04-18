import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, setDoc, doc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDbm0F39ZUfV32Wqg4VYNfGgaTdhMy0hmE",
    authDomain: "credencial-utc.firebaseapp.com",
    projectId: "credencial-utc",
    storageBucket: "credencial-utc.appspot.com", // Corregido: ".app" → ".appspot.com"
    messagingSenderId: "577550428491",
    appId: "1:577550428491:web:fcac370e847952329ba0ce"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Guardar usuario
export const guardarUsuario = async (id, datos) => {
    try {
        await setDoc(doc(db, "alumnos", id), datos);
        console.log("✅ Usuario guardado con éxito");
    } catch (error) {
        console.error("❌ Error al guardar:", error);
    }
};

// Editar usuario (merge)
export const editarUsuario = async (id, nuevosDatos) => {
    try {
        const alumnoRef = doc(db, "alumnos", id.toString()); // Convertimos el id a string
        await setDoc(alumnoRef, nuevosDatos, { merge: true });
        console.log("✅ Usuario editado con éxito");
    } catch (error) {
        console.error("❌ Error al editar usuario:", error);
    }
};


// Buscar usuario por correo
export const buscarUsuarioPorCorreo = async (email) => {
    try {
        const q = query(collection(db, "alumnos"), where("correo", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]; // Solo el primero
            return doc.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("❌ Error al buscar usuario:", error);
        return null;
    }
};

