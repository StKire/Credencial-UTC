import { buscarUsuarioPorMatricula } from './firebase/crud.js';

function obtenerMatriculaDesdeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('matricula');
}

document.addEventListener("DOMContentLoaded", async() => {

    const matricula = obtenerMatriculaDesdeURL();
    console.log("Matrícula recibida:", matricula);

    if (matricula) {
        try {
            const alumnoUtc = await buscarUsuarioPorMatricula(matricula);
            if (alumnoUtc) {
                const credencialFoto = document.getElementById('credencialFoto');
                const nombre = document.getElementById('nombre');
                const carrera = document.getElementById('carrera');
                const cuatrimestre = document.getElementById('cuatrimestre');
                const bloquesep = document.getElementById('bloquesep');
                const vigencia = document.getElementById('vigencia');
                const matricula = document.getElementById('matricula');
                const qrCanvas = document.getElementById('qrCanvas');

                if (credencialFoto) credencialFoto.src = alumnoUtc.foto;
                if (nombre) nombre.textContent = alumnoUtc.nombre;
                if (carrera) carrera.textContent = alumnoUtc.carrera;
                if (cuatrimestre) cuatrimestre.textContent = alumnoUtc.cuatrimestre;
                if (bloquesep) bloquesep.textContent = alumnoUtc.bloque_sep;
                if (vigencia) vigencia.textContent = alumnoUtc.vigencia;
                if (matricula) matricula.textContent = alumnoUtc.matricula;

                const qrLink = `https://stkire.github.io/Credencial-UTC/views/credencialEscolar.html?matricula=${encodeURIComponent(alumnoUtc.matricula)}`;
                QRCode.toCanvas(qrCanvas, qrLink, function (error) {
                    if (error) console.error(error);
                });

            }
        } catch (error) {
            console.error("❌ Error inesperado:", error);
        }
    }
})