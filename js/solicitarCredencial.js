import { guardarSolicitud, buscarSolicitudPorMatricula } from './firebase/crud.js';

const btnSolicitar = document.getElementById('confirmarSolicitud');

btnSolicitar.addEventListener('click', async () => {
    const alumnoUtcData = localStorage.getItem('alumnoUtc');

    if (alumnoUtcData) {
        const alumnoUtc = JSON.parse(alumnoUtcData);
        const matricula = alumnoUtc.matricula;
        const solicitudExistente = await buscarSolicitudPorMatricula(matricula);
        if(solicitudExistente) {
            const spinner = document.getElementById('spinner');
                    spinner.classList.remove('d-flex');
                    spinner.classList.add('d-none');
            const textoConfirmacion = document.getElementById('textoConfirmacion');
            textoConfirmacion.textContent = `Ya existe una solicitud de credencial física para la matrícula ${matricula}.`;
            textoConfirmacion.style.color = 'red';
            return;
        }   
        const datos = {
            foto: alumnoUtc.foto,
            nombre: alumnoUtc.nombre,
            matricula: alumnoUtc.matricula,
            correo: alumnoUtc.correo,
            solicitud: 'solicitud de credencial física',
            fecha: new Date().toLocaleDateString(),
            estado: 'pendiente', // Otros estados podrían ser: 'en proceso', 'aprobada', 'rechazada', 'completada'
            pago: 'pagoPendiente', // Otros estados podrían ser: 'pagada', 'pendiente de pago'
            fechaPago: null, // Fecha de pago si es que se paga
            fechaLimitada: null, // Fecha límite para el pago
        };
        await guardarSolicitud(alumnoUtc.matricula, datos);
        const spinner = document.getElementById('spinner');
                    spinner.classList.remove('d-flex');
                    spinner.classList.add('d-none');
        const textoConfirmacion = document.getElementById('textoConfirmacion');
        textoConfirmacion.textContent = `Tu solicitud para la credencial física ha sido enviada exitosamente. Nos pondremos en contacto contigo para más detalles.`;
        textoConfirmacion.style.color = 'green';
    }
});