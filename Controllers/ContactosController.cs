using CustomerSolutionCRUD.Models;
using CustomerSolutionCRUD.Services;
using Microsoft.AspNetCore.Mvc;

namespace CustomerSolutionCRUD.Controllers
{
    public class ContactosController : Controller
    {
        private readonly CustomerManagementDbContext _context;
        public ContactosController(CustomerManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetContactos(int idClienteSeleccionado)
        {
            var contactos = _context.ContactosCliente.Where(e => e.ClienteId == idClienteSeleccionado).ToList();
            return Json(contactos);
        }


        [HttpPost]
        public IActionResult Guardar([FromBody] ContactosCliente nuevoContacto)
        {
            if (nuevoContacto == null)
                return BadRequest();

            _context.ContactosCliente.Add(nuevoContacto);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        public IActionResult Actualizar([FromBody] ContactosCliente ContactoActualizado)
        {
            var contactoExistente = _context.ContactosCliente.FirstOrDefault(c => c.Id == ContactoActualizado.Id);

            if (contactoExistente == null)
            {
                return NotFound("Contacto no encontrado.");
            }

            contactoExistente.Nombre = ContactoActualizado.Nombre;
            contactoExistente.Email = ContactoActualizado.Email;
            contactoExistente.Telefono = ContactoActualizado.Telefono;

            _context.SaveChanges();

            return Ok("Contacto actualizado exitosamente.");
        }

        [HttpDelete]
        public IActionResult Eliminar(int id)
        {
            var contactoExistente = _context.ContactosCliente.FirstOrDefault(e => e.Id == id);
            if (contactoExistente == null)
            {
                return NotFound("Contacto no encontrado.");
            }

            _context.ContactosCliente.Remove(contactoExistente);
            _context.SaveChanges();

            return Ok("Contacto eliminado exitosamente.");
        }
    }
}
