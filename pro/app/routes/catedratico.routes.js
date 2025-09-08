module.exports = app => {
    const catedraticos = require("../controllers/catedratico.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo Catedratico
    router.post("/create/", catedraticos.create);
  
    // Obtener todos los Catedraticos
    router.get("/", catedraticos.findAll);
  
    // Obtener un solo Catedratico por nombre
    router.get("/nombre/:nombre", catedraticos.findOneByName);
  
    // Actualizar un Catedratico por nombre
    router.put("/nombre/:nombre", catedraticos.updateByName);
  
    // Eliminar un Catedratico por nombre
    router.delete("/nombre/:nombre", catedraticos.deleteByName);
  
    app.use('/api/catedraticos', router);
}
