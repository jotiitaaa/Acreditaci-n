
-- =====================================
-- BASE DE DATOS ESPIRASIS
-- =====================================

CREATE DATABASE IF NOT EXISTS espirasis;

USE espirasis;


-- =====================================
-- TABLA: ADMINISTRADORES
-- =====================================

CREATE TABLE administradores (

    id INT AUTO_INCREMENT PRIMARY KEY,

    usuario VARCHAR(50) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL

);


-- =====================================
-- TABLA: SERVICIOS
-- =====================================

CREATE TABLE servicios (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    descripcion TEXT NOT NULL,

    precio VARCHAR(50) DEFAULT 'Consultar',

    imagen VARCHAR(255),

    activo BOOLEAN DEFAULT TRUE

);


-- =====================================
-- TABLA: CONSULTAS
-- =====================================

CREATE TABLE consultas (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL,

    telefono VARCHAR(30),

    asunto VARCHAR(150) NOT NULL,

    mensaje TEXT NOT NULL,

    estado ENUM('no_leida', 'leida') DEFAULT 'no_leida',

    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


-- =====================================
-- DATOS INICIALES: SERVICIOS
-- =====================================

INSERT INTO servicios (nombre, descripcion, precio, imagen)
VALUES

(
    'Mantenimiento de equipos',
    'Mantenimiento preventivo y correctivo de computadoras y dispositivos.',
    'Consultar',
    'mantenimiento.jpg'
),

(
    'Instalación de software',
    'Instalación, configuración y actualización de programas y sistemas operativos.',
    'Consultar',
    'software.jpg'
),

(
    'Asesoramiento informático',
    'Orientación para elegir productos y soluciones tecnológicas.',
    'Consultar',
    'asesoramiento.jpg'
);
