module.exports = app => {
    const catedraticos = require("../controllers/catedratico.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo Catedratico
    router.post("/create/", catedraticos.create);
  
    // Obtener todos los Catedraticos
    router.get("/", catedraticos.findAll);
  
    // Obtener un solo Catedratico con id_catedratico
    router.get("/:id_catedratico", catedraticos.findOne);
  
    // Actualizar un Catedratico con id_catedratico
    router.put("/:id_catedratico", catedraticos.update);
  
    // Eliminar un Catedratico con id_catedratico
    router.delete("/:id_catedratico", catedraticos.delete);
  
    app.use('/api/catedraticos', router);
  }