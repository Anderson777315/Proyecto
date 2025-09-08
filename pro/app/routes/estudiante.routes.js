module.exports = app => {
    const estudiantes = require("../controllers/estudiante.controller.js");
    var router = require("express").Router();

    // Create a new Estudiante
    router.post("/create/", estudiantes.create);

    // Retrieve all Estudiantes
    router.get("/", estudiantes.findAll);

    // Retrieve a single Estudiante by id
    router.get("/:id", estudiantes.findOne);

    // Retrieve Estudiante by name
    router.get("/nombre/:nombre", estudiantes.findByName);

    // Update an Estudiante with id
    router.put("/update/:id", estudiantes.update);

    // Delete an Estudiante with id
    router.delete("/delete/:id", estudiantes.delete);

    // Delete all Estudiantes
    router.delete("/delete/", estudiantes.deleteAll);

    // Retrieve all activos (estado = 'activo')
    router.get("/estado/activos", estudiantes.findAllActivos);

    // Montamos el router en el endpoint base
    // Ejemplo: http://localhost:8081/api/estudiantes
    app.use("/api/estudiantes", router);
};