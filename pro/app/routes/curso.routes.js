const { curso } = require("../models/index.js");

module.exports = app => {
    const curso = require("../controllers/curso.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo curso
    router.post("/crear", curso.create);
  
    // Obtener todos los cursos
    router.get("/", curso.findAll);
  
    // Obtener un solo curso con id_curso
    router.get("/:id_curso", curso.findOne);
  
    // Actualizar un curso con id_curso
    router.put("/:id_curso", curso.update);
  
    // Eliminar un curso con id_curso
    router.delete("/:id_curso", curso.delete);
  //eliminar todos los cursos
   router.delete("/delete", curso.deleteAll);

    app.use('/api/curso', router);
  }