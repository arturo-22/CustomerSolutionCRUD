//Carga Datos Contactos
const tableBody = document.querySelector("#table_contactos tbody");
let selectedContacto = null;
let contactoIdSeleccionado = null;
let modalConfirmacionMode = null;
const idCliente = localStorage.getItem('clienteIdSeleccionado');

const loadContactos = async () => {
    try {
        if (!idCliente) {
            throw new Error("No se recibió el ID del contacto.");
        }
        const response = await fetch(`/Contactos/GetContactos?idClienteSeleccionado=${idCliente}`);
        if (!response.ok) throw new Error("Error al obtener los datos");

        const contactos = await response.json();
        tableBody.innerHTML = "";

        contactos.forEach(contacto => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${contacto.id}</td>
                <td>${contacto.nombre}</td>
                <td>${contacto.email}</td>
                <td>${contacto.telefono}</td>
            `;

            //Seleccionar fila
            row.addEventListener('click', () => {
                const selectedRow = document.querySelector(".selected");
                if (selectedRow) {
                    selectedRow.classList.remove("selected");
                }
                row.classList.add("selected");
                selectedContacto = contacto;
            });

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar los datos", error);
    }
};

loadContactos();

//Abrir Modal Contacto
document.getElementById('openModalContacto').addEventListener('click', function () {
    fetch('/Contactos/ModalContacto.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el contenido del modal');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('modalContainer').innerHTML = data;
            var modal = new bootstrap.Modal(document.getElementById('modalContacto'));
            modal.show();

            setNuevoClienteId();

            document.getElementById('modalMode').value = "Nuevo";

            loadModalContactoScript();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Abrir el modal contacto con los datos seleccionados
document.getElementById('openModalSelectedContacto').addEventListener('click', function () {

    if (!selectedContacto) {
        alert("Por favor, selecciona un contacto primero.");
        return;
    }

    fetch('/Contactos/ModalContacto.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el contenido del modal');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('modalContainer').innerHTML = data;
            var modal = new bootstrap.Modal(document.getElementById('modalContacto'));
            modal.show();

            document.getElementById('id').value = selectedContacto.id;
            document.getElementById('nombre').value = selectedContacto.nombre;
            document.getElementById('email').value = selectedContacto.email;
            document.getElementById('telefono').value = selectedContacto.telefono;
            document.getElementById('modalMode').value = "Actualizar";

            loadModalContactoScript();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

//Modal confirmacion contacto
document.getElementById('openModalConfirmacion').addEventListener('click', function () {

    if (!selectedContacto) {
        alert("Por favor, selecciona un contacto primero");
        return;
    }

    contactoIdSeleccionado = selectedContacto.id;

    fetch('/Views/Contactos/ModalContactoConfirmacion.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el contenido del modal');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('modalContainer').innerHTML = data;

            const modalElement = document.getElementById('modalContactoConfirmacion');
            var modal = new bootstrap.Modal(modalElement);
            modal.show();

            loadModalContactoConfirmacionScript();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Eliminar Contacto
async function eliminarContacto(id) {
    try {
        const response = await fetch(`/Contactos/Eliminar/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el contacto');
        }

        await loadContactos();

        selectedContacto = null;

        loadModalContactoConfirmacionScript();

    } catch (error) {
        console.error('Error:', error);
    }
}

//Numero de Id que sigue
function setNuevoClienteId() {
    const rows = document.querySelectorAll("#table_contactos tbody tr");
    const lastRow = rows[rows.length - 1];

    let lastId = 0;
    if (lastRow) {
        lastId = parseInt(lastRow.cells[0].textContent);
    }

    const nuevoId = lastId + 1; 

    const idField = document.getElementById('id');
    idField.value = nuevoId;
}


function loadModalContactoScript() {
    const modalScript = document.createElement("script");
    modalScript.src = "/Scripts/ModalContacto.js";
    document.body.appendChild(modalScript);
}

function loadModalContactoConfirmacionScript() {
    const modalScript = document.createElement("script");
    modalScript.src = "/Scripts/ModalContactoConfirmacion.js";
    document.body.appendChild(modalScript);
}