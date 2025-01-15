using CustomerSolutionCRUD.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomerSolutionCRUD.Services;

public partial class CustomerManagementDbContext : DbContext
{
    public CustomerManagementDbContext()
    {
    }

    public CustomerManagementDbContext(DbContextOptions<CustomerManagementDbContext> options) : base(options)
    {
    }

    public virtual DbSet<Clientes> Clientes { get; set; }

    public virtual DbSet<ContactosCliente> ContactosCliente { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Clientes>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Clientes__3214EC072FE2964E");

            entity.Property(e => e.CodigoPostal).HasMaxLength(5);
            entity.Property(e => e.Domicilio).HasMaxLength(40);
            entity.Property(e => e.Nombre).HasMaxLength(40);
            entity.Property(e => e.Poblacion).HasMaxLength(40);
        });

        modelBuilder.Entity<ContactosCliente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Contacto__3214EC073A931DE2");

            entity.Property(e => e.Email).HasMaxLength(40);
            entity.Property(e => e.Nombre).HasMaxLength(40);
            entity.Property(e => e.Telefono).HasMaxLength(40);

            entity.HasOne(d => d.Cliente).WithMany(p => p.ContactosCliente)
                .HasForeignKey(d => d.ClienteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Contactos__Clien__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
