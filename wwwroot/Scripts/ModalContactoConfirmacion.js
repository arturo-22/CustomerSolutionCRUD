//Eliminar Contacto
document.getElementById('btnModalContactoEliminar').addEventListener('click', async () => {
    try {
        if (!contactoIdSeleccionado) {
            throw new Error("No se recibió el ID del contacto.");
        }

        await eliminarContacto(contactoIdSeleccionado);

        const modalElement = document.getElementById('modalContactoConfirmacion');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

    } catch (error) {
        console.error("Error:", error);

    }
});