import { guardarSolicitudDeFoto, borrarSolicitudDeFotoPorMatricula } from './firebase/crud.js';

document.getElementById('btnCambiarFoto').addEventListener('click', async () => {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';

    inputFile.onchange = async (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;

        const reader = new FileReader();

            reader.onload = async (event) => {

            const base64Foto = event.target.result;
            const alumnoUtcData = localStorage.getItem('alumnoUtc');
            if (alumnoUtcData) {
                const alumnoUtc = JSON.parse(alumnoUtcData);
                const matricula = alumnoUtc.matricula;
                
                await borrarSolicitudDeFotoPorMatricula(matricula);
                try {
                    
                    const datos = {
                        foto: base64Foto,
                        nombre: alumnoUtc.nombre,
                        matricula: alumnoUtc.matricula,
                        correo: alumnoUtc.correo,
                        solicitud: 'solicitud de foto',
                        fecha: new Date().toLocaleDateString(),
                        estado: 'pendiente', // Otros estados podrían ser: 'en proceso', 'aprobada', 'rechazada', 'completada'
                        motivo: '', // Motivo de rechazo si aplica
                    };

                    await guardarSolicitudDeFoto(matricula, datos);
                    const spinner = document.getElementById('spinner');
                    spinner.classList.remove('d-flex');
                    spinner.classList.add('d-none');
                    const textoConfirmacion = document.getElementById('textoConfirmacion');
                    textoConfirmacion.textContent = `Tu solicitud para cambiar la foto ha sido enviada exitosamente. Nos pondremos en contacto contigo para más detalles.`;
                    textoConfirmacion.style.color = 'green';
                } catch (error) {
                    const textoConfirmacion = document.getElementById('textoConfirmacion');
                    textoConfirmacion.textContent = `Ocurrió un error al enviar tu solicitud.`;
                    textoConfirmacion.style.color = 'red';
                }
            }
        };

        reader.readAsDataURL(archivo);
    }
    inputFile.click();
});
