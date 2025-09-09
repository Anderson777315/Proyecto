const db = require("../models");
const Estudiante = db.estudiante; // asegúrate que en models/index.js sea "estudiante"
const Op = db.Sequelize.Op;

// Create and Save a new Estudiante
exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({ message: "El nombre no puede estar vacío!" });
    return;
  }

  const estudiante = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    carnet: req.body.carnet,
    fechanacimiento: req.body.fechanacimiento,
    numeroCel: req.body.numeroCel,
    carrera: req.body.carrera,
    estado: req.body.estado || "activo",
    semestre: req.body.semestre
  };

  Estudiante.create(estudiante)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el Estudiante."
      });
    });
};

// Retrieve all Estudiantes (opcional: ?nombre= para buscar parcial)
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Estudiante.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los estudiantes."
      });
    });
};

exports.findOneByNombre = (req, res) => {
  const nombre = req.params.nombre;

  Estudiante.findOne({ where: { nombre: { [Op.iLike]: nombre } } }) // exacto, case-insensitive
    .then(data => {
      if (data) return res.send(data);
      return res.status(404).send({ message: `No se encontró Estudiante con nombre=${nombre}` });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error recuperando Estudiante con nombre=" + nombre
      });
    });
};

// Update an Estudiante by the ID in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Estudiante.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Estudiante actualizado correctamente." });
      } else {
        res.send({
          message: `No se pudo actualizar Estudiante con id=${id}. Puede que no exista o el body esté vacío.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando Estudiante con id=" + id
      });
    });
};

// Delete an Estudiante by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Estudiante.destroy({ where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Estudiante eliminado correctamente!" });
      } else {
        res.send({
          message: `No se pudo eliminar Estudiante con id=${id}. No fue encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar Estudiante con id=" + id
      });
    });
};

// Delete all Estudiantes
exports.deleteAll = (req, res) => {
  Estudiante.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} Estudiantes fueron eliminados correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar todos los Estudiantes."
      });
    });
};

// Find all ACTIVE Estudiantes (estado = 'activo')
exports.findAllActivos = (req, res) => {
  Estudiante.findAll({ where: { estado: "activo" } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los Estudiantes activos."
      });
    });
};