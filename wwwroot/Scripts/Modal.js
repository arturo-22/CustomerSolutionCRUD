// Guardar Cliente
async function guardarCliente() {
    const nombre = document.getElementById('nombre').value;
    const domicilio = document.getElementById('direccion').value;
    const codigoPostal = document.getElementById('codigoPostal').value;
    const poblacion = document.getElementById('poblacion').value;

    // Validación básica
    if (!nombre || !direccion || !codigoPostal || !poblacion) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    const nuevoCliente = {
        nombre,
        domicilio,
        codigoPostal,
        poblacion
    };

    try {
        const response = await fetch('/Clientes/Guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoCliente),
        });

        if (!response.ok) {
            throw new Error('Error al guardar el cliente');
        }

        await loadClientes();

        const modal = bootstrap.Modal.getInstance(document.getElementById('modal'));
        modal.hide();

    } catch (error) {
        console.error('Error:', error);
    }
}

// Actualizar Cliente
async function actualizarCliente() {
    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const domicilio = document.getElementById('direccion').value;
    const codigoPostal = document.getElementById('codigoPostal').value;
    const poblacion = document.getElementById('poblacion').value;

    // Validación básica
    if (!nombre || !domicilio || !codigoPostal || !poblacion) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    // Crear objeto cliente actualizado
    const clienteActualizado = {
        id: clienteId,
        nombre,
        domicilio,
        codigoPostal,
        poblacion
    };

    try {
        // Enviar los datos al servidor con PUT
        const response = await fetch('/Clientes/Actualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteActualizado),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el cliente');
        }
        await loadClientes();

        const modal = bootstrap.Modal.getInstance(document.getElementById('modal'));
        modal.hide();

    } catch (error) {
        console.error('Error:', error);
    }
}

//Guardar con el boton Grabar
document.getElementById('guardar').addEventListener('click', function () {

    const modalMode = document.getElementById('modalMode').value;

    if (modalMode === "Nuevo") {
        guardarCliente();
    } else if (modalMode === "Actualizar") {
        actualizarCliente();
    }
});

// Guardar con enter
document.querySelector('#modal form').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        guardarCliente();
    }
});
