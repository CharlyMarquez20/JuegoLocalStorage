// Registro de usuarios
function registerUser() {
    let name = document.getElementById('nameInput').value.toUpperCase(); 
    if (!name) {
        Swal.fire('Error', 'Por favor ingrese un nombre de usuario', 'error');
        return;
    }
    let existingUser = getUsers().find(user => user.name === name);
    if (existingUser) {
        // Mostrar datos del usuario existente
        Swal.fire({
            title: 'Usuario Existente',
            html: `Nombre: ${existingUser.name}<br>Puntaje: ${existingUser.score}<br>Tiempo: ${existingUser.time}<br>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href="Juego.html?usuario="+name;
            }
        });
        return;
    }
    
    // Inicializar puntaje y tiempo en 0 para el nuevo usuario
    let score = 0;
    let time = 0;
    
    let newUser = {
        name,
        score,
        time
    };
    let users = getUsers();
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Mostrar mensaje de registro exitoso
    Swal.fire('Éxito', 'Registro exitoso', 'success');
    window.location.href="Juego.html?usuario="+name;
}

// Obtener datos de usuarios
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}