import { db } from './Firebase';
import { collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const guardarUsuario = async (id, datos) => {
    try {
        await setDoc(doc(collection(db, "usuarios"), id), datos);
        console.log("✅ Usuario guardado con éxito");
    } catch (error) {
        console.error("❌ Error al guardar:", error);
    }
};
