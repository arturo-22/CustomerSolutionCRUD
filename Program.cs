using CustomerSolutionCRUD.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<CustomerManagementDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("CustomerManagementDbContext"));

});

var app = builder.Build();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Views")),
    RequestPath = "/Views"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Contactos")),
    RequestPath = "/Contactos"
});

app.UseDefaultFiles();

app.UseStaticFiles();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Clientes}/{action=Index}/{id?}");

app.Run();
