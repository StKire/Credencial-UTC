document.getElementById("btnCerrar").addEventListener("click", () => {
    const modalHtml = `
        <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="logoutModalLabel">Cerrar Sesión</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Sesión cerrada correctamente.
                    </div>
                    <div class="modal-footer">
                        <button id="confirmLogout" type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
    logoutModal.show();

    document.getElementById("confirmLogout").addEventListener("click", () => {
        localStorage.removeItem("alumnoUtc");
        window.location.href = '../index.html';
    });
});