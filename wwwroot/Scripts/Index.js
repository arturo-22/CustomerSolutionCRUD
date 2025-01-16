let selectedCliente = null;
let clienteIdSeleccionado = null;

//Carga Datos Clientes
const tableBody = document.querySelector("#table_clientes tbody");

const loadClientes = async () => {
    try {
        const response = await fetch('/Clientes/GetClientes');
        if (!response.ok) throw new Error("Error al obtener los datos");

        const clientes = await response.json();
        tableBody.innerHTML = "";

        clientes.forEach(cliente => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.domicilio}</td>
                <td>${cliente.codigoPostal}</td>
                <td>${cliente.poblacion}</td>
            `;

            //Seleccionar fila y obtener Id
            row.addEventListener('click', () => {
                const selectedRow = document.querySelector(".selected");
                if (selectedRow) {
                    selectedRow.classList.remove("selected");
                }
                row.classList.add("selected");
                selectedCliente = cliente;
            });

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar los datos", error);
    }
};

loadClientes();


//Abrir Modal
document.getElementById('openModal').addEventListener('click', function () {
    fetch('Views/Clientes/Modal.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el contenido del modal');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('modalContainer').innerHTML = data;
            var modal = new bootstrap.Modal(document.getElementById('modal'));
            modal.show();

            setNuevoClienteId();

            document.getElementById('modalMode').value = "Nuevo";

            loadModalScript();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Abrir el modal con los datos seleccionado
document.getElementById('openModalSelected').addEventListener('click', function () {

    if (!selectedCliente) {
        alert("Por favor, selecciona un cliente primero.");
        return;
    }

    clienteIdSeleccionado = selectedCliente.id;

    fetch('Views/Clientes/Modal.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el contenido del modal');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('modalContainer').innerHTML = data;
            var modal = new bootstrap.Modal(document.getElementById('modal'));
            modal.show();

            // Rellenar los campos del modal con los datos del cliente seleccionado
            document.getElementById('id').value = selectedCliente.id;
            document.getElementById('nombre').value = selectedCliente.nombre;
            document.getElementById('direccion').value = selectedCliente.domicilio;
            document.getElementById('codigoPostal').value = selectedCliente.codigoPostal;
            document.getElementById('poblacion').value = selectedCliente.poblacion;
            document.getElementById('modalMode').value = "Actualizar";

            loadModalScript();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

//Modal confirmacion 
document.getElementById('eliminarCliente').addEventListener('click', function () {

    if (!selectedCliente) {
        alert("Por favor, selecciona un cliente primero.");
        return;
    }

    clienteIdSeleccionado = selectedCliente.id;

    fetch('Views/Clientes/ModalConfirmacion.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el contenido del modal');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('modalContainer').innerHTML = data;

            const modalElement = document.getElementById('modalConfirmacion');
            var modal = new bootstrap.Modal(modalElement);
            modal.show();

            loadModalConfirmacionScript();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Eliminar Cliente
async function eliminarCliente(id) {
    try {
        const response = await fetch(`/Clientes/Eliminar/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el cliente');
        }

        await loadClientes();

        selectedCliente = null;

        loadModalConfirmacionScript();

    } catch (error) {
        console.error('Error:', error);
    }
}

//Abrir pantalla Contactos
document.getElementById('openContactos').addEventListener('click', function () {

    if (!selectedCliente) {
        alert("Por favor, selecciona un cliente primero.");
        return;
    }

    const idCliente = selectedCliente.id;
    localStorage.setItem('clienteIdSeleccionado', idCliente);

    window.location.href = '/Contactos/Contacto.html';
});

//Numero de Id que sigue
function setNuevoClienteId() {
    const rows = document.querySelectorAll("#table_clientes tbody tr");
    const lastRow = rows[rows.length - 1];

    let lastId = 0;
    if (lastRow) {
        lastId = parseInt(lastRow.cells[0].textContent);
    }

    const nuevoId = lastId + 1;

    const idField = document.getElementById('id');
    idField.value = nuevoId;
}

//Deseleccionar filas
document.body.addEventListener('click', (event) => {
    const table = document.querySelector('#table_clientes');

    if (!table.contains(event.target) || !event.target.closest('.selected')) {
        const selectedRow = document.querySelector(".selected");
        if (selectedRow) {
            selectedRow.classList.remove("selected");
        }
    }
});


function loadModalScript() {
    const modalScript = document.createElement("script");
    modalScript.src = "/Scripts/Modal.js";
    document.body.appendChild(modalScript);
}

function loadModalConfirmacionScript() {
    const modalScript = document.createElement("script");
    modalScript.src = "/Scripts/ModalConfirmacion.js";
    document.body.appendChild(modalScript);
}