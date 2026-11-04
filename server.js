
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");

// CONEXION MYSQL

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "espirasis"
});

conexion.connect((error) => {
    if (error) {
        console.error("Error al conectar con MySQL:", error.message);
        return;
    }

    console.log("Conexion con MySQL establecida correctamente.");
});

// CONFIGURAR EXPRESS

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));
// RUTA DE PRUEBA

app.get("/api/estado", (req, res) => {
    res.json({
        mensaje: "Servidor funcionando correctamente"
    });
});

// RUTA PARA GUARDAR CONSULTAS
app.post("/api/consultas", (req, res) => {
    console.log("Llegó una consulta al servidor");
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    // Verificar los campos obligatorios
    if (!nombre || !email || !asunto || !mensaje) {
        return res.status(400).json({
            mensaje: "Completá todos los campos obligatorios."
        });
    }

    // Guardar la consulta en MySQL
    const consulta = `
        INSERT INTO consultas (nombre, email, telefono, asunto, mensaje)
        VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(
        consulta,
        [nombre, email, telefono || null, asunto, mensaje],
        (error, resultado) => {
            if (error) {
                console.error("Error al guardar la consulta:", error.message);

                return res.status(500).json({
                    mensaje: "No se pudo guardar la consulta."
                });
            }

            res.status(201).json({
                mensaje: "¡Consulta enviada correctamente!",
                id: resultado.insertId
            });
        }
    );
});

// RUTA DE SERVICIOS

app.get("/api/servicios", (req, res) => {

    const consulta = "SELECT * FROM servicios WHERE activo = TRUE";

    conexion.query(consulta, (error, resultados) => {

        if (error) {
            console.error(error.message);

            return res.status(500).json({
                mensaje: "Error al consultar los servicios"
            });
        }

        res.json(resultados);
    });

});

// INICIAR SERVIDOR

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});

