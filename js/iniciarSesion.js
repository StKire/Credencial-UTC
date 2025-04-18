import { buscarUsuarioPorCorreo } from './firebase/crud.js';

document.getElementById("btnIngresar").addEventListener("click", async () => {
    const txtCorreo = document.getElementById('txtCorreo').value.trim();

    // Validación básica del campo
    if (txtCorreo === '') {
        mostrarAlerta("Por favor, ingresa un correo válido.");
        return;
    }

    try {
        const usuario = await buscarUsuarioPorCorreo(txtCorreo);

        if (!usuario) {
            mostrarAlerta("Correo no registrado. Verifica que esté bien escrito.");
        } else {
            // Puedes guardar los datos del usuario en localStorage si los necesitas en la siguiente página
            localStorage.setItem("alumnoUtc", JSON.stringify(usuario));
            window.location.href = './views/credencial.html';
        }
    } catch (error) {
        console.error("❌ Error inesperado:", error);
        mostrarAlerta("Ocurrió un error al intentar buscar el usuario.");
    }
});

function mostrarAlerta(mensaje) {
    const alerta = document.getElementById('alerta');
    alerta.textContent = mensaje;
    alerta.classList.remove('d-none');
    alerta.classList.add('d-flex');
}
