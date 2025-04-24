async function crearContenido(callback) {
    const alumnoUtc = JSON.parse(localStorage.getItem('alumnoUtc'));

    const qrLink = `https://stkire.github.io/Credencial-UTC/views/credencialEscolar.html?matricula=${encodeURIComponent(alumnoUtc.matricula)}`;

    // Crear QR en canvas temporal
    const canvasQR = document.createElement('canvas');
    canvasQR.width = 200;
    canvasQR.height = 200;
    await QRCode.toCanvas(canvasQR, qrLink);

    const contenedor = document.createElement('div');
    contenedor.style.position = 'fixed';
    contenedor.style.left = '-9999px';
    contenedor.style.width = '600px';

    contenedor.innerHTML = `
    <div class="col-lg-6 col-md-12 mx-auto container-lg row h-lg-50 h-md-auto p-3"
      style="background: linear-gradient(160deg, rgba(255,255,255,1) 0%, rgba(231,49,42,1) 20%, rgba(29,60,136,1) 70%);
      color: white; font-family: sans-serif; width: 600px;">
      <div class="col-lg-4 col-md-12 d-flex justify-content-center align-items-center px-4">
          <div id="qrContainer"></div>
      </div>
      <div class="col-lg-8 col-md-12 mx-auto d-flex flex-column justify-content-center align-items-start p-lg-3 p-md-2">
          <img src="../images/logoBlanco.png" alt="Logo Utc Ecatepec" style="width: 100px;">
          <p class="text-center mx-auto text-light my-1 fs-4 text-uppercase">Nombre del Alumno:<br><span>${alumnoUtc.nombre}</span></p>
          <p class="text-center mx-auto text-light my-1 fs-4 text-uppercase">Carrera:<br><span>${alumnoUtc.carrera}</span></p>
          <p class="text-center mx-auto text-light my-1 fs-4 text-uppercase">Cuatrimestre:<br><span>${alumnoUtc.cuatrimestre}</span></p>
          <p class="text-center mx-auto text-light my-1 fs-4 text-uppercase">Bloque-Sep:<br><span>${alumnoUtc.bloque_sep}</span></p>
      </div>
    </div>`;

    document.body.appendChild(contenedor);
    contenedor.querySelector('#qrContainer').appendChild(canvasQR);

    callback(contenedor);
}

function descargarImagen() {
    crearContenido((contenedor) => {
        html2canvas(contenedor).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'credencial.png';
            link.click();
            document.body.removeChild(contenedor);
        });
    });
}

function descargarPDF() {
    crearContenido(async (contenedor) => {
        const canvas = await html2canvas(contenedor);
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('credencial.pdf');
        document.body.removeChild(contenedor);
    });
}

document.getElementById('descargarPdf').addEventListener('click', ()=>descargarPDF())
document.getElementById('descargarPng').addEventListener('click', ()=>descargarImagen())
