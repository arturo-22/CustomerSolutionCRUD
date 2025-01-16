CREATE DATABASE CustomerManagementDB
GO
CREATE TABLE Clientes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(40) NULL,
    Domicilio NVARCHAR(40) NULL,
    CodigoPostal NVARCHAR(5) NULL,
    Poblacion NVARCHAR(40) NULL
);
GO
-- Crear la tabla ContactosCliente
CREATE TABLE ContactosCliente (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ClienteId INT NOT NULL,
    Nombre NVARCHAR(40) NULL,
    Telefono NVARCHAR(40) NULL,
    Email NVARCHAR(40) NULL,
    FOREIGN KEY (ClienteId) REFERENCES Clientes(Id)
);
