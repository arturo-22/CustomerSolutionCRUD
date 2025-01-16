//Eliminar Cliente
document.getElementById('btnModalEliminar').addEventListener('click', async () => {
    try {
        if (!clienteIdSeleccionado) {
            throw new Error("No se recibió el ID del cliente.");
        }

        await eliminarCliente(clienteIdSeleccionado);

        // Cierra el modal después de eliminar
        const modalElement = document.getElementById('modalConfirmacion');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    } catch (error) {
        console.error("Error:", error);

    }
});