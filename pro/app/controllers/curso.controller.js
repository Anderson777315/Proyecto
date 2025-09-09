const db = require("../models");
const Curso = db.Curso;

// Crear un nuevo curso
exports.create = async (req, res) => {
  if (!req.body.nombre) {
    return res.status(400).send({ message: "El nombre del curso es obligatorio." });
  }

  const nuevoCurso = {
    nombre: req.body.nombre,
    codigo: req.body.codigo,
    semestre: req.body.semestre,
    creditos: req.body.creditos,
    estado: req.body.estado,
    catedratico: req.body.catedratico
    
  };

  try {
    const curso = await Curso.create(nuevoCurso);
    res.status(201).send(curso);
  } catch (err) {
    console.error("Error al crear curso:", err);
    res.status(500).send({ message: err.message || "Error al crear el curso." });
  }
};

// Obtener todos los cursos
exports.findAll = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    console.log("Cursos obtenidos:", cursos);
    res.status(200).send(cursos);
  } catch (err) {
    console.error("Error al obtener cursos:", err);
    res.status(500).send({ message: err.message || "Ocurrió un error al obtener los cursos." });
  }
};

// Obtener un curso por nombre
exports.findOne = async (req, res) => {
  const nombre = req.params.nombre;
  try {
    const curso = await Curso.findOne({ where: { nombre: nombre } });
    if (!curso) return res.status(404).send({ message: "Curso no encontrado." });
    res.send(curso);
  } catch (err) {
    console.error("Error al obtener curso:", err);
    res.status(500).send({ message: err.message || "Error al obtener el curso." });
  }
};

// Actualizar un curso por nombre
exports.update = async (req, res) => {
  const nombre = req.params.nombre;
  try {
    const [updated] = await Curso.update(req.body, { where: { nombre: nombre } });
    if (updated) {
      const cursoActualizado = await Curso.findOne({ where: { nombre: nombre } });
      res.send(cursoActualizado);
    } else {
      res.status(404).send({ message: "Curso no encontrado para actualizar." });
    }
  } catch (err) {
    console.error("Error al actualizar curso:", err);
    res.status(500).send({ message: err.message || "Error al actualizar el curso." });
  }
};

// Eliminar un curso por nombre
exports.delete = async (req, res) => {
  const nombre = req.params.nombre;
  try {
    const deleted = await Curso.destroy({ where: { nombre: nombre } });
    if (deleted) {
      res.send({ message: "Curso eliminado correctamente." });
    } else {
      res.status(404).send({ message: "Curso no encontrado para eliminar." });
    }
  } catch (err) {
    console.error("Error al eliminar curso:", err);
    res.status(500).send({ message: err.message || "Error al eliminar el curso." });
  }
};

// Eliminar todos los cursos
exports.deleteAll = async (req, res) => {
  try {
    const deleted = await Curso.destroy({ where: {}, truncate: false });
    res.send({ message: `${deleted} cursos fueron eliminados.` });
  } catch (err) {
    console.error("Error al eliminar todos los cursos:", err);
    res.status(500).send({ message: err.message || "Error al eliminar los cursos." });
  }
};
