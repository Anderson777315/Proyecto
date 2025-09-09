module.exports = app => {
  const grados = require("../controllers/grado.controller.js");
  const router = require("express").Router();

  router.post("/create", grados.create);
  router.get("/", grados.findAll);
  router.get("/:id", grados.findOne);
  router.get("/estudiante/:nombre", grados.findByEstudianteName); 
  router.put("/update/:id", grados.update);
  router.delete("/delete/:id", grados.delete);
  router.delete("/delete", grados.deleteAll);

  app.use("/api/grados", router);
};