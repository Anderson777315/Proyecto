module.exports = app => {
    const catedraticos = require("../controllers/catedratico.controller.js");
    const router = require("express").Router();

    // Crear un nuevo catedrático
    router.post("/", catedraticos.create);

    // Obtener todos los catedráticos
    router.get("/", catedraticos.findAll);

    // Obtener un catedrático por nombre
    router.get("/nombre/:nombre", catedraticos.findOneByName);

    // Actualizar un catedrático por nombre
    router.put("/nombre/:nombre", catedraticos.updateByName);

    // Eliminar un catedrático por nombre
    router.delete("/nombre/:nombre", catedraticos.deleteByName);

    // Eliminar todos los catedráticos
    router.delete("/", catedraticos.deleteAll);

    app.use('/api/catedraticos', router);
};
