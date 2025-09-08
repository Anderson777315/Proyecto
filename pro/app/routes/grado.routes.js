module.exports = app => {
    const grados = require("../controllers/grado.controller.js");
    var router = require("express").Router();

    // Crear un nuevo grado
    router.post("/create/", grados.create);

    // Obtener todos los grados
    router.get("/", grados.findAll);

    // Obtener un grado por id
    router.get("/:id", grados.findOne);

    // Actualizar un grado por id
    router.put("/update/:id", grados.update);

    // Eliminar un grado por id
    router.delete("/delete/:id", grados.delete);

    // Eliminar todos los grados
    router.delete("/delete/", grados.deleteAll);

    // Obtener todos los grados de un estudiante específico
    router.get("/student/:studentID", grados.findAllByStudent);

    // Obtener todos los grados de un curso específico
    router.get("/course/:courseID", grados.findAllByCourse);

    // Registrar rutas con prefijo
    // Ejemplo: http://localhost:Puerto/api/grado/
    app.use("/api/grado", router);
};