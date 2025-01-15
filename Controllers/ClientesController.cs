using Microsoft.AspNetCore.Mvc;

namespace CustomerSolutionCRUD.Controllers
{
    public class ClientesController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}
        public IActionResult Index()
        {
            // Ruta absoluta al archivo index.html
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "Clientes", "index.html");
            return PhysicalFile(filePath, "text/html");
        }
    }
}
