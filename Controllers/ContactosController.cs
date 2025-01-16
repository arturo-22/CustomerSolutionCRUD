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
        public IActionResult GetContactos()
        {
            var clientes = _context.ContactosCliente.ToList();
            return Json(clientes);
        }


        [HttpPost]
        public IActionResult Guardar([FromBody] ContactosCliente nuevoCliente)
        {
            if (nuevoCliente == null)
                return BadRequest();

            _context.ContactosCliente.Add(nuevoCliente);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        public IActionResult Actualizar([FromBody] ContactosCliente clienteActualizado)
        {
            if (clienteActualizado == null || clienteActualizado.Id <= 0)
            {
                return BadRequest("Datos inválidos.");
            }

            var clienteExistente = _context.Clientes.FirstOrDefault(c => c.Id == clienteActualizado.Id);

            if (clienteExistente == null)
            {
                return NotFound("Cliente no encontrado.");
            }

            clienteExistente.Nombre = clienteActualizado.Nombre;
            clienteExistente.Domicilio = clienteActualizado.Telefono;
            clienteExistente.CodigoPostal = clienteActualizado.Email;

            _context.SaveChanges();

            return Ok("Cliente actualizado exitosamente.");
        }

        [HttpDelete]
        public IActionResult Eliminar(int id)
        {
            var clienteExistente = _context.ContactosCliente.FirstOrDefault(e => e.Id == id);
            if (clienteExistente == null)
            {
                return NotFound("Cliente no encontrado.");
            }

            _context.ContactosCliente.Remove(clienteExistente);
            _context.SaveChanges();

            return Ok("Cliente eliminado exitosamente.");
        }
    }
}
