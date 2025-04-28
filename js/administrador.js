document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.getElementById('navItems');
    const user = JSON.parse(localStorage.getItem('alumnoUtc'));
    const admin = user.admin;
        if (admin === true) {
        const newItem = document.createElement('li');
        newItem.className = 'nav-item';
        newItem.innerHTML = '<a href="admin.html" class="btn text-white btn-primary nav-link">Administrar</a>';
        navItems.appendChild(newItem);
    }
})