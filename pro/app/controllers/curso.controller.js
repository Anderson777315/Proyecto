const db = require("../models");
const Curso = db.Curso; // Asegúrate de que tu modelo se llame así
const Op = db.Sequelize.Op;

// Crear un nuevo curso
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El nombre no puede estar vacío!"
        });
        return;
    }

    const curso = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        duracion: req.body.duracion,
        nivel: req.body.nivel
    };

    Curso.create(curso)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el curso."
            });
        });
};

// Obtener todos los cursos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Curso.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los cursos."
            });
        });
};

// Obtener un curso por nombre
exports.findOne = (req, res) => {
    const nombre = req.params.nombre;

    Curso.findOne({ where: { nombre: nombre } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el curso con nombre=" + nombre
            });
        });
};

// Actualizar un curso por nombre
exports.update = (req, res) => {
    const nombre = req.params.nombre;

    Curso.update(req.body, { where: { nombre: nombre } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Curso actualizado correctamente." });
            } else {
                res.send({
                    message: `No se pudo actualizar el curso con nombre=${nombre}. Quizá no se encontró o el cuerpo está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el curso con nombre=" + nombre
            });
        });
};

// Eliminar un curso por nombre
exports.delete = (req, res) => {
    const nombre = req.params.nombre;

    Curso.destroy({ where: { nombre: nombre } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Curso eliminado correctamente!" });
            } else {
                res.send({
                    message: `No se pudo eliminar el curso con nombre=${nombre}. Quizá no se encontró!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el curso con nombre=" + nombre
            });
        });
};

// Eliminar todos los cursos
exports.deleteAll = (req, res) => {
    Curso.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} cursos fueron eliminados correctamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar todos los cursos."
            });
        });
};
