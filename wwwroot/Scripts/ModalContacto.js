// Guardar Contacto
async function guardarContacto() {
    const clienteId = idCliente;
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;

    // Validación básica
    if (!nombre || !telefono || !email) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    const nuevoContacto = {
        clienteId,
        nombre,
        telefono,
        email
    };

    try {
        const response = await fetch('/Contactos/Guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoContacto),
        });

        if (!response.ok) {
            throw new Error('Error al guardar el contacto');
        }

        await loadContactos();

        const modal = bootstrap.Modal.getInstance(document.getElementById('modalContacto'));
        modal.hide();

    } catch (error) {
        console.error('Error:', error);
    }
}

// Actualizar Contacto
async function actualizarContacto() {
    // Obtener los datos del formulario
    const id = selectedContacto.id;
    const clienteId = idCliente;
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    // Validación básica
    if (!nombre || !telefono || !email) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    const contactoActualizado = {
        id,
        clienteId,
        nombre,
        email,
        telefono
    };

    try {
        // Enviar los datos al servidor con PUT
        const response = await fetch('/Contactos/Actualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactoActualizado),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el contacto');
        }
        await loadContactos();

        const modal = bootstrap.Modal.getInstance(document.getElementById('modalContacto'));
        modal.hide();

    } catch (error) {
        console.error('Error:', error);
    }
}

//Guardar con el boton Grabar
document.getElementById('guardarContacto').addEventListener('click', function () {

    const modalMode = document.getElementById('modalMode').value;

    if (modalMode === "Nuevo") {
        guardarContacto();
    } else if (modalMode === "Actualizar") {
        actualizarContacto();
    }
});

// Guardar con enter
document.querySelector('#modalContacto form').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (modalMode === "Nuevo") {
            guardarContacto();
        } else if (modalMode === "Actualizar") {
            actualizarContacto();
        }
    }
});
