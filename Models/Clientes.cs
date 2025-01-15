using System;
using System.Collections.Generic;

namespace CustomerSolutionCRUD.Models;

public partial class Clientes
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Domicilio { get; set; }

    public string? CodigoPostal { get; set; }

    public string? Poblacion { get; set; }

    public virtual ICollection<ContactosCliente> ContactosCliente { get; set; } = new List<ContactosCliente>();
}
