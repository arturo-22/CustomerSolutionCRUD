﻿using CustomerSolutionCRUD.Models;
using CustomerSolutionCRUD.Services;
using Microsoft.AspNetCore.Mvc;

namespace CustomerSolutionCRUD.Controllers
{
    public class ClientesController : Controller
    {
        private readonly CustomerManagementDbContext _context;
        public ClientesController(CustomerManagementDbContext context) 
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "Clientes", "Index.html");
            return PhysicalFile(filePath, "text/html");
        }

        [HttpGet]
        public IActionResult GetClientes()
        {
            var clientes = _context.Clientes.ToList();
            return Json(clientes);
        }


        [HttpPost]
        public IActionResult Guardar([FromBody] Clientes nuevoCliente)
        {
            if (nuevoCliente == null)
                return BadRequest();

            _context.Clientes.Add(nuevoCliente);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        public IActionResult Actualizar([FromBody] Clientes clienteActualizado)
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
            clienteExistente.Domicilio = clienteActualizado.Domicilio;
            clienteExistente.CodigoPostal = clienteActualizado.CodigoPostal;
            clienteExistente.Poblacion = clienteActualizado.Poblacion;

            _context.SaveChanges();

            return Ok("Cliente actualizado exitosamente.");
        }

        [HttpDelete]
        public IActionResult Eliminar(int id)
        {
            var clienteExistente = _context.Clientes.FirstOrDefault(e => e.Id == id);
            if (clienteExistente == null)
            {
                return NotFound("Cliente no encontrado.");
            }

            _context.Clientes.Remove(clienteExistente);
            _context.SaveChanges();

            return Ok("Cliente eliminado exitosamente.");
        }

    }
}
