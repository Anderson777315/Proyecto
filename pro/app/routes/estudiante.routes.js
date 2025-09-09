module.exports = app => {
    const estudiantes = require("../controllers/estudiante.controller.js");
    const router = require("express").Router();

    // Crear un nuevo estudiante
    router.post("/", estudiantes.create);

    // Obtener todos los estudiantes
    router.get("/", estudiantes.findAll);

    // Obtener un estudiante por carnet
    router.get("/carnet/:carnet", estudiantes.findOneByCarnet);

    // Actualizar un estudiante por carnet
    router.put("/carnet/:carnet", estudiantes.updateByCarnet);

    // Eliminar un estudiante por carnet
    router.delete("/carnet/:carnet", estudiantes.deleteByCarnet);

    // Eliminar todos los estudiantes
    router.delete("/", estudiantes.deleteAll);

    // Obtener todos los estudiantes activos
    router.get("/estado/activos", estudiantes.findAllActivos);

    app.use("/api/estudiantes", router);
};
