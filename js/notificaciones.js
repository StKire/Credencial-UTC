import { buscarSolicitudPorMatricula, buscarSolicitudDeFotoPorMatricula } from './firebase/crud.js'

document.addEventListener('DOMContentLoaded', async () => {
    const notificaciones = document.getElementById('notificaciones');
    const alumnoUtcData = localStorage.getItem('alumnoUtc');

    if (!alumnoUtcData) return;

    const alumnoUtc = JSON.parse(alumnoUtcData);
    const matricula = alumnoUtc.matricula;

    const solicitudFoto = await buscarSolicitudDeFotoPorMatricula(matricula);
    const spinner = document.getElementById('notifoto');
            spinner.classList.remove('d-flex');
            spinner.classList.add('d-none');
    const solicitud = await buscarSolicitudPorMatricula(matricula);
    const spinner2 = document.getElementById('noticreden');
            spinner2.classList.remove('d-flex');
            spinner2.classList.add('d-none');

    // Función para agregar alertas
    const mostrarAlerta = (tipo, mensaje) => {
        notificaciones.innerHTML += `
            <div class="alert alert-${tipo}" role="alert">
                ${mensaje}
            </div>
        `;
    };

    // Función para procesar la solicitud de foto
    const procesarSolicitudFoto = (solicitudFoto) => {        
        try {
            const { estado, fecha, motivo } = solicitudFoto;
            switch (estado) {
                case 'aceptada':
                    mostrarAlerta('success', `<strong>¡Solicitud aceptada!</strong> Tu Foto fue aceptada el ${fecha}.`);
                    break;
                case 'rechazada':
                    mostrarAlerta('danger', `<strong>¡Solicitud rechazada!</strong> Tu Foto fue rechazada el ${fecha}.<br><span>Por el motivo: ${motivo}</span>`);
                    break;
                case 'pendiente':
                    mostrarAlerta('warning', `<strong>¡Solicitud pendiente!</strong> Tu Foto está pendiente desde el ${fecha}.`);
                    break;
                default:
                    mostrarAlerta('info', `<strong>No tienes notificaciones sobre Foto por el momento</strong>.`);
                    break;
            }
        } catch {
            mostrarAlerta('info', `<strong>No tienes notificaciones sobre Foto por el momento</strong>.`);
            
        }
    };

    // Función para procesar la solicitud de credencial
    const procesarSolicitudCredencial = (solicitud) => {
        try {
            const { estado, fecha, pago } = solicitud;
            switch (estado) {
                case 'aceptada':
                    mostrarAlerta('success', `<strong>¡Solicitud aceptada!</strong> Tu solicitud fue aceptada el ${fecha}.<br><span>Por favor realiza el pago correspondiente</span>`);

                    if (pago === 'pagoPendiente') {
                        notificaciones.innerHTML += `
                        <div class="alert alert-warning" role="alert">
                            <strong>¡Pago pendiente!</strong> Tu solicitud está pendiente de pago desde el ${fecha}.
                            <br><span>Por favor realiza el pago correspondiente</span>
                            <button class="btn btn-primary mt-2" id="pagarBtn">Generar Ficha de pago</button>
                        </div>
                    `;
                    } else if (pago === 'pagoAceptado') {
                        mostrarAlerta('success', `<strong>¡Pago aceptado!</strong> Tu solicitud fue aceptada y el pago fue confirmado el ${fecha}.<br><span>Tu credencial está en proceso.</span>`);
                    }
                    break;

                case 'rechazada':
                    mostrarAlerta('danger', `<strong>¡Solicitud rechazada!</strong> Tu solicitud fue rechazada el ${fecha}.<br><span>Por favor realiza la solicitud de nuevo</span>`);
                    break;

                case 'pendiente':
                    mostrarAlerta('warning', `<strong>¡Solicitud pendiente!</strong> Tu solicitud está pendiente desde el ${fecha}.`);
                    break;

                case 'enProceso':
                    mostrarAlerta('info', `<strong>¡Solicitud en proceso!</strong> Tu Credencial está en proceso desde el ${fecha}.`);
                    break;

                case 'porEntregar':
                    mostrarAlerta('info', `<strong>¡Credencial por entregar!</strong> Tu credencial fue aceptada y está lista para ser entregada a partir del ${fecha}.`);
                    break;
            }
        } catch {
            mostrarAlerta('info', `<strong>No tienes notificaciones sobre Credencial por el momento</strong>.`);
        }
    };

    // Ejecutar las funciones
    procesarSolicitudFoto(solicitudFoto);
    procesarSolicitudCredencial(solicitud);
});
