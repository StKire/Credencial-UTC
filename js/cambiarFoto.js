import { editarUsuario } from './firebase/crud.js';

document.getElementById('btnCambiarFoto').addEventListener('click', async () => {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';

    const alumnoUtcData = localStorage.getItem('alumnoUtc');

    if (!alumnoUtcData) {
        console.warn('⚠️ No se encontró información del alumno en localStorage');
        return;
    }

    const alumnoUtc = JSON.parse(alumnoUtcData);

    inputFile.onchange = async (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;

        const reader = new FileReader();

        reader.onload = async (event) => {
            const base64Foto = event.target.result;

            try {
                // Actualizamos Firestore
                await editarUsuario(alumnoUtc.matricula, { foto: base64Foto });

                // Actualizamos localStorage
                alumnoUtc.foto = base64Foto;
                localStorage.setItem('alumnoUtc', JSON.stringify(alumnoUtc));

                // Mostramos la nueva imagen en pantalla
                const imgNav = document.getElementById('navFoto');
                const imgCredencial = document.getElementById('credencialFoto');
                if (imgNav) imgNav.src = base64Foto;
                if (imgCredencial) imgCredencial.src = base64Foto;

                console.log("✅ Foto de perfil actualizada correctamente");
            } catch (error) {
                console.error("❌ Error al actualizar la foto:", error);
            }
        };

        reader.readAsDataURL(archivo);
    };

    inputFile.click();
});
