import { buscarSolicitudPorMatricula } from './firebase/crud.js'

document.addEventListener('DOMContentLoaded', async () => {
    const notificaciones = document.getElementById('notificaciones');

    const alumnoUtcData = localStorage.getItem('alumnoUtc');

    if (alumnoUtcData) {
        const alumnoUtc = JSON.parse(alumnoUtcData);
        const matricula = alumnoUtc.matricula;
        const solicitud = await buscarSolicitudPorMatricula(matricula);

        try {
            const estado = solicitud.estado;
            const fecha = solicitud.fecha;
            switch (estado) {
                case 'aceptada':
                    notificaciones.innerHTML = `<div class="alert alert-success" role="alert">
                    <strong>¡Solicitud aceptada!</strong> Tu solicitud fue aceptada el ${fecha}.
                    <br><span>Por favor realice el pago correspondiente</span>
                </div>`;
                    if (solicitud.pago === `pagoPendiente`) {
                        notificaciones.innerHTML += `<div class="alert alert-warning" role="alert">
                        <strong>¡Pago pendiente!</strong> Tu solicitud está pendiente de pago desde el ${fecha}.
                        <br><span>Por favor realice el pago correspondiente</span>
                        <button class="btn btn-primary" id="pagarBtn">Generar Ficha de pago</button>
                    </div>`;
                    } else if (solicitud.pago === `pagoAceptado`) {
                        notificaciones.innerHTML += `<div class="alert alert-success" role="alert">
                        <strong>¡Pago aceptado!</strong> Tu solicitud fue aceptada y el pago fue confirmado el ${fecha}.
                        <br><span>Tu credencial está en proceso.</span>
                    </div>`;
                    }
                    break;
                case 'rechazada':
                    notificaciones.innerHTML = `<div class="alert alert-danger" role="alert">
                    <strong>¡Solicitud rechazada!</strong> Tu solicitud fue rechazada el ${fecha}.
                    <br><span>Por favor realice la solicitud de nuevo</span>
                </div>`;
                    break;
                case 'pendiente':
                    notificaciones.innerHTML = `<div class="alert alert-warning" role="alert">
                    <strong>¡Solicitud pendiente!</strong> Tu solicitud está pendiente desde el ${fecha}.
                    <br><span>Por favor realice la solicitud de nuevo</span>
                </div>`;
                    break;
                case `porEntregar`:
                    notificaciones.innerHTML = `<div class="alert alert-info" role="alert">
                    <strong>¡Credencial por entregar!</strong> Tu credencial fue aceptada y está lista para ser entregada el ${fecha}.
                </div>`;
                    break;
            }
        } catch (error) {
            notificaciones.innerHTML = `<div class="alert alert-info" role="alert">
                    <strong>No Tienes notificaciones por el momento</strong>.
                </div>`;
        }



    }
});
