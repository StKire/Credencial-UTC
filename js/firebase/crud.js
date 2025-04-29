import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, setDoc, doc, query, where, getDocs, writeBatch } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// Buscar usuario por matrícula
export const buscarUsuarioPorMatricula = async (matricula) => {
    try {
        const q = query(collection(db, "alumnos"), where("matricula", "==", Number(matricula)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]; // Solo el primero
            return doc.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("❌ Error al buscar usuario por matrícula:", error);
        return null;
    }
};

// Guardar solicitud
export const guardarSolicitud = async (id, datos) => {
    try {
        await setDoc(doc(db, "credencialFisica", id.toString()), datos);
        console.log("✅ Solicitud guardada con éxito");
    } catch (error) {
        console.error("❌ Error al guardar solicitud:", error);
    }
};

//editar solicitud de credencial (merge)
export const editarSolicitud = async (id, nuevosDatos) => {
    try {
        const solicitudRef = doc(db, "credencialFisica", id.toString());
        await setDoc(solicitudRef, nuevosDatos, { merge: true });
        console.log("✅ Solicitud editada con éxito");
    } catch (error) {
        console.error("❌ Error al editar solicitud:", error);
    }
}

//borrar solicitud por matricula
export const borrarSolicitudPorMatricula = async (matricula) => {
    try {
        const q = query(collection(db, "credencialFisica"), where("matricula", "==", Number(matricula)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const batch = writeBatch(db);
            querySnapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        } else {
            console.log("⚠️ No se encontraron solicitudes para la matrícula proporcionada");
        }
    } catch (error) {
        console.error("❌ Error al borrar solicitud por matrícula:", error);
    }
}

// Buscar solicitud por matrícula
export const buscarSolicitudPorMatricula = async (matricula) => {
    try {
        const q = query(collection(db, "credencialFisica"), where("matricula", "==", Number(matricula)));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]; // Solo el primero
            return doc.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("❌ Error al buscar solicitud por matrícula:", error);
        return null;
    }
};

// Guardar solicitud de foto
export const guardarSolicitudDeFoto = async (id, datos) => {
    try {
        await setDoc(doc(db, "solicitudesFotos", id.toString()), datos);
        console.log("✅ Solicitud de foto guardada con éxito");
    } catch (error) {
        console.error("❌ Error al guardar solicitud de foto:", error);
    }
};

// Obtener todos los documentos de la colección "fotos"
export const obtenerTodasLasFotos = async () => {
    try {
        const fotosSnapshot = await getDocs(collection(db, "fotos"));
        const fotos = fotosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("✅ Fotos obtenidas con éxito");
        return fotos;
    } catch (error) {
        console.error("❌ Error al obtener fotos:", error);
        return [];
    }
};

// Buscar solicitud de foto por matrícula
export const buscarSolicitudDeFotoPorMatricula = async (matricula) => {
    try {
        const q = query(collection(db, "solicitudesFotos"), where("matricula", "==", Number(matricula)));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]; // Solo el primero
            return { id: doc.id, ...doc.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error("❌ Error al buscar solicitud de foto por matrícula:", error);
        return null;
    }
};

// Borrar solicitud de foto por matrícula
export const borrarSolicitudDeFotoPorMatricula = async (matricula) => {
    try {
        const q = query(collection(db, "solicitudesFotos"), where("matricula", "==", Number(matricula)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const batch = writeBatch(db);
            querySnapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        } else {
            console.log("⚠️ No se encontraron solicitudes de foto para la matrícula proporcionada");
        }
    } catch (error) {
        console.error("❌ Error al borrar solicitud de foto por matrícula:", error);
    }
};

// Obtener todos los documentos de la colección "credencialFisica" donde el estado sea "pendiente"
export const obtenerCredencialesFisicasPendientes = async () => {
    try {
        const q = query(collection(db, "credencialFisica"), where("estado", "==", "pendiente"));
        const credencialesSnapshot = await getDocs(q);
        const credenciales = credencialesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("✅ Credenciales físicas pendientes obtenidas con éxito");
        return credenciales;
    } catch (error) {
        console.error("❌ Error al obtener credenciales físicas pendientes:", error);
        return [];
    }
};

// Obtener todas las solicitudes de foto donde el estado sea "pendiente"
export const obtenerSolicitudesDeFotoPendientes = async () => {
    try {
        const q = query(collection(db, "solicitudesFotos"), where("estado", "==", "pendiente"));
        const solicitudesSnapshot = await getDocs(q);
        const solicitudes = solicitudesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("✅ Solicitudes de foto pendientes obtenidas con éxito");
        return solicitudes;
    } catch (error) {
        console.error("❌ Error al obtener solicitudes de foto pendientes:", error);
        return [];
    }
};

// Editar solicitud de foto (merge)
export const editarSolicitudDeFoto = async (id, nuevosDatos) => {
    try {
        const solicitudRef = doc(db, "solicitudesFotos", id.toString());
        await setDoc(solicitudRef, nuevosDatos, { merge: true });
        console.log("✅ Solicitud de foto editada con éxito");
    } catch (error) {
        console.error("❌ Error al editar solicitud de foto:", error);
    }
};

// Guardar reporte de error con ID automático y retornar el ID
export const guardarReporteDeError = async (datos) => {
    try {
        const docRef = await addDoc(collection(db, "reportesErrores"), datos);
        console.log("✅ Reporte de error guardado con éxito, ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("❌ Error al guardar reporte de error:", error);
        return null;
    }
};