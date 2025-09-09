module.exports = app => {
  const estudiantes = require("../controllers/estudiante.controller.js");
  const router = require("express").Router();

  router.post("/create", estudiantes.create);
  router.get("/", estudiantes.findAll);
  router.get("/nombre/:nombre", estudiantes.findOneByNombre); // 👈 get one by name
  router.put("/update/:id", estudiantes.update);              // by id
  router.delete("/delete/:id", estudiantes.delete);           // by id
  router.delete("/delete", estudiantes.deleteAll);
  router.get("/estado/activos", estudiantes.findAllActivos);

  app.use("/api/estudiantes", router);
};