import { guardarReporteDeError } from "./firebase/crud.js";

document.addEventListener("DOMContentLoaded", () => {

    const alumno = localStorage.getItem("alumnoUtc");
    if (alumno) {
        const alumnoUtc = JSON.parse(alumno);
        const userName = document.getElementById('userName');
        const imgNav = document.getElementById('navFoto');

        if (userName) userName.textContent = alumnoUtc.nombre
        if (imgNav) imgNav.src = alumnoUtc.foto;
    }


    document.getElementById('reportarErroresForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const matricula = document.getElementById('matricula').value.trim();
        const error = document.getElementById('error').value.trim();

        if (nombre && matricula && error) {
            const datos = {
                nombre: nombre,
                matricula: matricula,
                error: error
            };

            const reporteId = await guardarReporteDeError(datos);

            const modalHtml = `
                <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="successModalLabel">Éxito</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Reporte enviado con éxito.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
        }
        else {
            const modalHtml = `
                <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="errorModalLabel">Error</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Por favor, completa todos los campos.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
            errorModal.show();
        }
    });
})