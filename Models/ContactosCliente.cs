using System;
using System.Collections.Generic;

namespace CustomerSolutionCRUD.Models;

public partial class ContactosCliente
{
    public int Id { get; set; }

    public int ClienteId { get; set; }

    public string? Nombre { get; set; }

    public string? Telefono { get; set; }

    public string? Email { get; set; }

    public virtual Clientes Cliente { get; set; } = null!;
}
