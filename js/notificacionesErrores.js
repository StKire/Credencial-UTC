import { obtenerReportesDeErrores, borrarReporteDeErrorPorId } from './firebase/crud.js'


document.addEventListener('DOMContentLoaded', async () => {
    // Simulación de datos de reportes de errores
    let errorReports = await obtenerReportesDeErrores();

    // Remove duplicate reports based on a unique property (e.g., 'error')
    const seenErrors = new Set();
    errorReports = errorReports.filter(report => {
        if (seenErrors.has(report.error)) {
            return false;
        }
        seenErrors.add(report.error);
        return true;
    });

    const errorReportsSection = document.getElementById('errorReportsSection');
    const errorReportsContainer = document.getElementById('errorReports');

    if (errorReports.length > 0) {
        errorReportsSection.classList.remove('d-none');
        errorReports.forEach(report => {            
            const reportCard = document.createElement('div');
            reportCard.className = 'col-12 col-md-6 mb-4';
            reportCard.innerHTML = `
            <div class="card bg-light shadow-sm border-danger">
            <div class="card-body">
                <h5 class="card-title text-danger">Id del Reporte: ${report.id}</h5>
                <p class="card-text">Nombre: ${report.nombre}</p>
                <p class="card-text">Matrícula: ${report.matricula}</p>
                <p class="card-text">Reporte: ${report.error}</p>
                <button class="btn btn-danger btn-sm delete-report-btn" data-id="${report.id}">Borrar</button>
            </div>
            </div>
        `;
            errorReportsContainer.appendChild(reportCard);
        });

        // Add event listener for delete buttons
        errorReportsContainer.addEventListener('click', async (event) => {
            if (event.target.classList.contains('delete-report-btn')) {
            const reportId = event.target.getAttribute('data-id');
            try {
                // Call a function to delete the report from the database
                await borrarReporteDeErrorPorId(reportId);
                // Remove the report card from the DOM
                event.target.closest('.col-12').remove();
                location.reload(); // Reload the page to reflect changes
            } catch (error) {
                console.error('Error al borrar el reporte:', error);
            }
            }
        });
    }
})