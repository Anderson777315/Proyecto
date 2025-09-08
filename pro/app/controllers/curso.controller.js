const db = require("../models");
const Curso = db.curso;
const Op = db.Sequelize.Op;

// Crear un nuevo curso
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({ message: "El nombre del curso no puede estar vacío!" });
        return;
    }

    const curso = {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        semestre: req.body.semestre,
        creditos: req.body.creditos,
        estado_curso: req.body.estado_curso ? req.body.estado_curso : "activo",
        catedraticoCod: req.body.catedraticoCod
    };

    Curso.create(curso)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Ocurrió un error al crear el curso." });
        });
};

// Obtener todos los cursos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Curso.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Ocurrió un error al obtener los cursos." });
        });
};

// Obtener un curso por nombre
exports.findOne = (req, res) => {
    const nombre = req.params.nombre;

    Curso.findOne({ where: { nombre: nombre } })
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "Curso no encontrado" });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al obtener curso con nombre=" + nombre });
        });
};

// Actualizar un curso por nombre
exports.update = (req, res) => {
    const nombre = req.params.nombre;

    Curso.update(req.body, { where: { nombre } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Curso actualizado correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar el curso con nombre=${nombre}. Quizá no se encontró.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar curso con nombre=" + nombre });
        });
};

// Eliminar un curso por nombre
exports.delete = (req, res) => {
    const nombre = req.params.nombre;

    Curso.destroy({ where: { nombre } })
        .then(num => {
            if (num == 1) res.send({ message: "Curso eliminado correctamente." });
            else res.send({ message: `No se encontró el curso con nombre=${nombre}.` });
        })
        .catch(err => {
            res.status(500).send({ message: "No se pudo eliminar curso con nombre=" + nombre });
        });
};

// Eliminar todos los cursos
exports.deleteAll = (req, res) => {
    Curso.destroy({ where: {}, truncate: false })
        .then(nums => res.send({ message: `${nums} cursos eliminados.` }))
        .catch(err => {
            res.status(500).send({ message: err.message || "Ocurrió un error al eliminar todos los cursos." });
        });
};

// Obtener todos los cursos activos
exports.findAllActive = (req, res) => {
    Curso.findAll({ where: { estado_curso: "activo" } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Ocurrió un error al obtener cursos activos." });
        });
};
