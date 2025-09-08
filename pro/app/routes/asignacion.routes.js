module.exports = app => {
    const asignaciones = require("../controllers/asignacion.controller.js");
    var router = require("express").Router();

    // Crear una nueva asignación
    router.post("/create/", asignaciones.create);

    // Obtener todas las asignaciones
    router.get("/", asignaciones.findAll);

    // Obtener todas las asignaciones con estado 'inscrito'
    router.get("/estado", asignaciones.findAllByEstado);

    // Obtener una asignación por id
    router.get("/:id", asignaciones.findOne);

    // Actualizar una asignación por id
    router.put("/update/:id", asignaciones.update);

    // Eliminar una asignación por id
    router.delete("/delete/:id", asignaciones.delete);

    // Eliminar todas las asignaciones
    router.delete("/delete/", asignaciones.deleteAll);

    // Se puede utilizar app.use para simplificar la URI
    // Ejemplo: http://localhost:Puerto/api/asignacion/
    app.use("/api/asignacion", router);
};