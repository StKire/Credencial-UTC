document.getElementById("btnCerrar").addEventListener("click",()=> {
    alert('Sesión cerrada correctamente.');
    localStorage.removeItem("alumnoUtc");
    window.location.href = '../index.html';
})