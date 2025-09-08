module.exports = app => {
    const curso = require("../controllers/curso.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo curso
    router.post("/crear", curso.create);
  
    // Obtener todos los cursos
    router.get("/", curso.findAll);
  
    // Obtener un solo curso por nombre
    router.get("/nombre/:nombre", curso.findOneByName);
  
    // Actualizar un curso por nombre
    router.put("/nombre/:nombre", curso.updateByName);
  
    // Eliminar un curso por nombre
    router.delete("/nombre/:nombre", curso.deleteByName);

    // Eliminar todos los cursos
    router.delete("/delete", curso.deleteAll);

    app.use('/api/curso', router);
}
