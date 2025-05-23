document.addEventListener('DOMContentLoaded', () => {
    const alumnoUtcData = localStorage.getItem('alumnoUtc');

    if (alumnoUtcData) {
        const alumnoUtc = JSON.parse(alumnoUtcData);

        const userName = document.getElementById('userName');
        const imgNav = document.getElementById('navFoto');

        const imgCredencial = document.getElementById('credencialFoto');
        const credencialNombre = document.getElementById('credencialNombre');
        const credencialMatricula = document.getElementById('credencialMatricula');
        const credencialCarrera = document.getElementById('credencialCarrera');
        const credencialCuatrimestre = document.getElementById('credencialCuatrimestre');
        const credencialVigencia = document.getElementById('credencialVigencia');
        const credencialCorreo = document.getElementById('credencialCorreo');
        const qrCanvas = document.getElementById('qrCanvas');

        if (userName) userName.textContent = alumnoUtc.nombre
        if (imgNav) imgNav.src = alumnoUtc.foto;

        if (imgCredencial) imgCredencial.src = alumnoUtc.foto;
        if (credencialNombre) credencialNombre.textContent = alumnoUtc.nombre;
        if (credencialMatricula) credencialMatricula.textContent = alumnoUtc.matricula;
        if (credencialCarrera) credencialCarrera.textContent = alumnoUtc.carrera;
        if (credencialCuatrimestre) credencialCuatrimestre.textContent = alumnoUtc.cuatrimestre;
        if (credencialVigencia) credencialVigencia.textContent = alumnoUtc.vigencia;
        if (credencialCorreo) credencialCorreo.textContent = alumnoUtc.correo;

        const matricula = alumnoUtc.matricula;
        const qrLink = `https://stkire.github.io/Credencial-UTC/views/credencialEscolar.html?matricula=${encodeURIComponent(matricula)}`;

        if (qrCanvas) {
            QRCode.toCanvas(qrCanvas, qrLink, function (error) {
                if (error) console.error('Error generating QR code:', error);
            });
        }

    } else {
        console.log('No se encontró información con el nombre "alumnoUtc" en el localStorage.');
    }




})