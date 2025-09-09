module.exports = app => {
    const cursoController = require("../controllers/curso.controller.js");
    const router = require("express").Router();

    // Crear un nuevo curso
    router.post("/", cursoController.create);

    // Obtener todos los cursos
    router.get("/", cursoController.findAll);

    // Obtener un curso por nombre
    router.get("/nombre/:nombre", cursoController.findOne);

    // Actualizar un curso por nombre
    router.put("/nombre/:nombre", cursoController.update);

    // Eliminar un curso por nombre
    router.delete("/nombre/:nombre", cursoController.delete);

    // Eliminar todos los cursos
    router.delete("/", cursoController.deleteAll);

    app.use('/api/curso', router);
};
