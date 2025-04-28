import { obtenerTodasLasCredencialesFisicas, buscarUsuarioPorMatricula, obtenerTodasLasSolicitudesDeFoto, editarSolicitudDeFoto, editarUsuario } from "./firebase/crud.js";

document.addEventListener("DOMContentLoaded", () => {
    const alumno = localStorage.getItem("alumnoUtc");
    if (alumno) {
        const alumnoUtc = JSON.parse(alumno);
        const userName = document.getElementById('userName');
        const imgNav = document.getElementById('navFoto');

        if (userName) userName.textContent = alumnoUtc.nombre
        if (imgNav) imgNav.src = alumnoUtc.foto;
    }

    const tarjetasCredenciales = document.getElementById("tarjetasCredenciales");
    const credenciales = obtenerTodasLasCredencialesFisicas();
    
    credenciales.then((credenciales) => {
        credenciales.forEach((credencial) => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("card", "mb-3", "border-light", "btn", "btn-light");

            tarjeta.addEventListener("click", async() => {
                const alumnoCredencial = await buscarUsuarioPorMatricula(credencial.matricula);
                // Crear el modal
                const modal = document.createElement("div");
                modal.classList.add("modal", "fade");
                modal.setAttribute("tabindex", "-1");
                modal.setAttribute("role", "dialog");

                const modalDialog = document.createElement("div");
                modalDialog.classList.add("modal-dialog", "modal-xl");
                modalDialog.setAttribute("role", "document");

                const modalContent = document.createElement("div");
                modalContent.classList.add("modal-content");

                const modalBody = document.createElement("div");
                modalBody.classList.add("modal-body");

                // Contenido del diseño rectangular horizontal
                const container = document.createElement("div");
                container.classList.add("row", "mx-auto", "container-lg", "h-auto", "p-3", "rounded-5");
                container.style.background = "url(../images/Credencial-100.jpg)";
                container.style.backgroundSize = "cover";

                const imgContainer = document.createElement("div");
                imgContainer.classList.add("col-lg-4", "col-md-12", "d-flex", "justify-content-center", "align-items-center", "px-4");

                const img = document.createElement("img");
                img.src = alumnoCredencial.foto;
                img.alt = "Foto del Alumno";
                img.classList.add("rounded-circle", "mb-lg-3");
                img.style.width = "170px";
                img.style.height = "220px";

                imgContainer.appendChild(img);

                const infoContainer = document.createElement("div");
                infoContainer.classList.add("col-lg-8", "col-md-12", "d-flex", "flex-column", "justify-content-center", "align-items-start", "p-lg-3", "p-md-2");

                const title = document.createElement("h2");
                title.classList.add("text-center", "text-primary", "fs-1", "text-capitalize");
                title.textContent = "Credencial Universitaria";

                const logo = document.createElement("img");
                logo.src = "../images/logoBlanco.png";
                logo.alt = "Logo Utc Ecatepec";
                logo.classList.add("mx-auto", "mb-3");
                logo.style.width = "100px";

                const nombre = document.createElement("p");
                nombre.classList.add("text-light", "my-1", "fs-4", "text-uppercase");
                nombre.innerHTML = `Nombre del Alumno: <span>${alumnoCredencial.nombre}</span>`;

                const matricula = document.createElement("p");
                matricula.classList.add("text-light", "my-1", "fs-4", "text-uppercase");
                matricula.innerHTML = `Matricula: <span>${alumnoCredencial.matricula}</span>`;

                const carrera = document.createElement("p");
                carrera.classList.add("text-light", "my-1", "fs-4", "text-uppercase");
                carrera.innerHTML = `Carrera: <span>${alumnoCredencial.carrera}</span>`;

                const cuatrimestre = document.createElement("p");
                cuatrimestre.classList.add("text-light", "my-1", "fs-4", "text-uppercase");
                cuatrimestre.innerHTML = `Cuatrimestre: <span>${alumnoCredencial.cuatrimestre}</span>`;

                const bloquesep = document.createElement("p");
                bloquesep.classList.add("text-light", "my-1", "fs-4", "text-uppercase");
                bloquesep.innerHTML = `Bloque-Sep: <span>${alumnoCredencial.bloque_sep}</span>`;

                infoContainer.appendChild(title);
                infoContainer.appendChild(logo);
                infoContainer.appendChild(nombre);
                infoContainer.appendChild(matricula);
                infoContainer.appendChild(carrera);
                infoContainer.appendChild(cuatrimestre);
                infoContainer.appendChild(bloquesep);

                container.appendChild(imgContainer);
                container.appendChild(infoContainer);

                modalBody.appendChild(container);

                const modalFooter = document.createElement("div");
                modalFooter.classList.add("modal-footer");

                const closeFooterButton = document.createElement("button");
                closeFooterButton.classList.add("btn", "btn-primary");
                closeFooterButton.setAttribute("data-bs-dismiss", "modal");
                closeFooterButton.textContent = "Cerrar";

                modalFooter.appendChild(closeFooterButton);

                modalContent.appendChild(modalBody);
                modalContent.appendChild(modalFooter);

                modalDialog.appendChild(modalContent);
                modal.appendChild(modalDialog);

                // Agregar el modal al cuerpo del documento
                document.body.appendChild(modal);

                // Mostrar el modal
                const bootstrapModal = new bootstrap.Modal(modal);
                bootstrapModal.show();
            });

            const row = document.createElement("div");
            row.classList.add("row", "g-0");

            const colImg = document.createElement("div");
            colImg.classList.add("col-md-4", "d-flex", "align-items-center", "justify-content-center", "text-white");

            const imgWrapper = document.createElement("p");
            imgWrapper.classList.add("card-text");

            const img = document.createElement("img");
            img.src = credencial.foto;
            img.classList.add("rounded-circle");
            img.style.width = "150px";
            img.style.height = "150px";

            imgWrapper.appendChild(img);
            colImg.appendChild(imgWrapper);

            const colContent = document.createElement("div");
            colContent.classList.add("col-md-8");

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const nombre = document.createElement("h5");
            nombre.classList.add("card-title", "mb-1");
            nombre.innerHTML = `Nombre: <br><p>${credencial.nombre}</p>`;

            const matricula = document.createElement("span");
            matricula.classList.add("card-text");
            matricula.innerHTML = `Matrícula: <span>${credencial.matricula}</span>`;

            const bloque = document.createElement("p");
            bloque.classList.add("card-text", "mb-1");
            bloque.innerHTML = `Fecha: <span>${credencial.fecha}</span>`;

            cardBody.appendChild(nombre);
            cardBody.appendChild(matricula);
            cardBody.appendChild(bloque);

            colContent.appendChild(cardBody);

            row.appendChild(colImg);
            row.appendChild(colContent);

            tarjeta.appendChild(row);

            tarjetasCredenciales.appendChild(tarjeta);
        });
    });


    const tarjetasFotos = document.getElementById('tarjetasFotos');
    const fotos = obtenerTodasLasSolicitudesDeFoto();

    fotos.then((fotos)=>{
        fotos.forEach((foto) => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("card", "mb-3", "border-light");

            const row = document.createElement("div");
            row.classList.add("row", "g-0");

            const colImg = document.createElement("div");
            colImg.classList.add("col-md-4", "d-flex", "align-items-center", "justify-content-center", "bg-light", "text-white");

            const imgWrapper = document.createElement("p");
            imgWrapper.classList.add("card-text");

            const img = document.createElement("img");
            img.src = foto.foto;
            img.classList.add("rounded-circle");
            img.style.width = "150px";
            img.style.height = "150px";
            img.id = "imgFoto";

            imgWrapper.appendChild(img);
            colImg.appendChild(imgWrapper);

            const colContent = document.createElement("div");
            colContent.classList.add("col-md-8", "bg-light");

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const nombre = document.createElement("h5");
            nombre.classList.add("card-title", "mb-1");
            nombre.innerHTML = `Nombre: <span id="nombreFoto">${foto.nombre}</span>`;

            const bloque = document.createElement("p");
            bloque.classList.add("card-text", "mb-1");
            bloque.innerHTML = `Bloque-SEP: <span id="bloqueFoto">${foto.bloque_sep}</span>`;

            const matricula = document.createElement("p");
            matricula.classList.add("card-text");
            matricula.innerHTML = `Matrícula: <span id="matriculaFoto">${foto.matricula}</span>`;

            const buttonRow = document.createElement("div");
            buttonRow.classList.add("row");

            const acceptButton = document.createElement("button");
            acceptButton.classList.add("col-5", "mx-auto", "btn", "btn-success");
            acceptButton.textContent = "Aceptar";
            acceptButton.addEventListener('click', async ()=>{
                await editarSolicitudDeFoto(foto.matricula,{estatus: aceptada});
                await editarUsuario(foto.matricula,{foto:foto.foto})
            })

            const denyButton = document.createElement("button");
            denyButton.classList.add("col-5", "mx-auto", "btn", "btn-danger");
            denyButton.textContent = "Denegar";
            denyButton.addEventListener('click', () => {
                // Crear el modal
                const modal = document.createElement("div");
                modal.classList.add("modal", "fade");
                modal.setAttribute("tabindex", "-1");
                modal.setAttribute("role", "dialog");

                const modalDialog = document.createElement("div");
                modalDialog.classList.add("modal-dialog", "modal-dialog-centered");
                modalDialog.setAttribute("role", "document");

                const modalContent = document.createElement("div");
                modalContent.classList.add("modal-content");

                const modalHeader = document.createElement("div");
                modalHeader.classList.add("modal-header");

                const modalTitle = document.createElement("h5");
                modalTitle.classList.add("modal-title");
                modalTitle.textContent = "Razón para rechazar la fotografía";

                const closeButton = document.createElement("button");
                closeButton.classList.add("btn-close");
                closeButton.setAttribute("data-bs-dismiss", "modal");
                closeButton.setAttribute("aria-label", "Close");

                modalHeader.appendChild(modalTitle);
                modalHeader.appendChild(closeButton);

                const modalBody = document.createElement("div");
                modalBody.classList.add("modal-body");

                const selectReason = document.createElement("select");
                selectReason.classList.add("form-select", "mb-3");
                selectReason.innerHTML = `
                    <option value="" selected disabled>Selecciona una razón</option>
                    <option value="Foto borrosa">Foto borrosa</option>
                    <option value="Foto no corresponde al alumno">Foto no corresponde al alumno</option>
                    <option value="Foto con mala calidad">Foto con mala calidad</option>
                `;

                const customReason = document.createElement("textarea");
                customReason.classList.add("form-control");
                customReason.setAttribute("placeholder", "Escribe una razón específica (opcional)");
                customReason.setAttribute("rows", "3");

                modalBody.appendChild(selectReason);
                modalBody.appendChild(customReason);

                const modalFooter = document.createElement("div");
                modalFooter.classList.add("modal-footer");

                const saveButton = document.createElement("button");
                saveButton.classList.add("btn", "btn-primary");
                saveButton.textContent = "Guardar";
                saveButton.addEventListener('click', async () => {
                    const selectedReason = selectReason.value;
                    const specificReason = customReason.value;

                    if (!selectedReason && !specificReason) {
                        alert("Por favor selecciona o escribe una razón.");
                        return;
                    }

                    const reason = specificReason || selectedReason;
                    await editarSolicitudDeFoto(foto.matricula, { estatus: "rechazada", motivo: reason });

                    // Cerrar el modal
                    const bootstrapModal = bootstrap.Modal.getInstance(modal);
                    bootstrapModal.hide();
                });

                const cancelButton = document.createElement("button");
                cancelButton.classList.add("btn", "btn-secondary");
                cancelButton.setAttribute("data-bs-dismiss", "modal");
                cancelButton.textContent = "Cancelar";

                modalFooter.appendChild(saveButton);
                modalFooter.appendChild(cancelButton);

                modalContent.appendChild(modalHeader);
                modalContent.appendChild(modalBody);
                modalContent.appendChild(modalFooter);

                modalDialog.appendChild(modalContent);
                modal.appendChild(modalDialog);

                // Agregar el modal al cuerpo del documento
                document.body.appendChild(modal);

                // Mostrar el modal
                const bootstrapModal = new bootstrap.Modal(modal);
                bootstrapModal.show();
            });

            buttonRow.appendChild(acceptButton);
            buttonRow.appendChild(denyButton);

            cardBody.appendChild(nombre);
            cardBody.appendChild(bloque);
            cardBody.appendChild(matricula);
            cardBody.appendChild(buttonRow);

            colContent.appendChild(cardBody);

            row.appendChild(colImg);
            row.appendChild(colContent);

            tarjeta.appendChild(row);

            tarjetasFotos.appendChild(tarjeta);
        });
    });


    

});