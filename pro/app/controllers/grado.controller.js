const db = require("../models");
const Grado = db.grado;
const Estudiante = db.estudiante;
const Op = db.Sequelize.Op;

/**
 * Crear un grado
 * Body esperado: { cursoId, estudianteId, parcial1?, parcial2?, exafinal?, zona? }
 */
exports.create = (req, res) => {
  const { cursoId, estudianteId } = req.body;
  if (!cursoId || !estudianteId) {
    return res.status(400).send({ message: "cursoId y estudianteId son obligatorios." });
  }

  const grado = {
    cursoId,
    estudianteId,
    parcial1: req.body.parcial1 ?? 0,
    parcial2: req.body.parcial2 ?? 0,
    exafinal: req.body.exafinal ?? 0,
    zona: req.body.zona ?? 0
  };

  Grado.create(grado)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error al crear grado." }));
};

/**
 * Listar grados
 * Soporta filtros por query: ?cursoId= & ?estudianteId=
 * Incluye datos del estudiante (nombre, apellido, carnet)
 */
exports.findAll = (req, res) => {
  const where = {};
  if (req.query.cursoId) where.cursoId = req.query.cursoId;
  if (req.query.estudianteId) where.estudianteId = req.query.estudianteId;

  Grado.findAll({
    where,
    include: [{
      model: Estudiante,
      attributes: ["nombre", "apellido", "carnet"]
    }]
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error al obtener grados." }));
};

/**
 * Obtener un grado por ID
 * Incluye datos del estudiante
 */
exports.findOne = (req, res) => {
  const id = req.params.id;

  Grado.findByPk(id, {
    include: [{
      model: Estudiante,
      attributes: ["nombre", "apellido", "carnet"]
    }]
  })
    .then(data => data
      ? res.send(data)
      : res.status(404).send({ message: `No existe grado con id=${id}` })
    )
    .catch(err => res.status(500).send({ message: "Error al obtener grado id=" + id }));
};

/**
 * Buscar grados por NOMBRE de estudiante (parcial, case-insensitive)
 * Ruta sugerida: GET /api/grados/estudiante/:nombre
 */
exports.findByEstudianteName = (req, res) => {
  const nombre = req.params.nombre;

  Grado.findAll({
    include: [{
      model: Estudiante,
      attributes: ["nombre", "apellido", "carnet"],
      where: { nombre: { [Op.iLike]: `%${nombre}%` } }
    }]
  })
    .then(data => {
      if (data.length > 0) res.send(data);
      else res.status(404).send({ message: `No se encontraron grados para estudiante con nombre=${nombre}` });
    })
    .catch(err => res.status(500).send({ message: "Error buscando grados por nombre de estudiante" }));
};

/**
 * Actualizar un grado por ID
 * Body puede incluir: parcial1, parcial2, exafinal, zona, cursoId, estudianteId
 */
exports.update = (req, res) => {
  const id = req.params.id;

  Grado.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Grado actualizado correctamente." });
      } else {
        res.status(404).send({ message: `No se pudo actualizar grado id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: "Error al actualizar grado id=" + id }));
};

/**
 * Eliminar un grado por ID
 */
exports.delete = (req, res) => {
  const id = req.params.id;

  Grado.destroy({ where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Grado eliminado correctamente." });
      } else {
        res.status(404).send({ message: `No se encontró grado id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: "Error al eliminar grado id=" + id }));
};

/**
 * Eliminar todos los grados (opcional)
 */
exports.deleteAll = (_req, res) => {
  Grado.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} grados eliminados.` }))
    .catch(err => res.status(500).send({ message: err.message || "Error eliminando grados." }));
};