const db = require("../models");
const Catedratico = db.Catedratico; // Asegúrate de que tu modelo se llame así
const Op = db.Sequelize.Op;

// Crear un nuevo catedrático
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El nombre no puede estar vacío!"
        });
        return;
    }

    const catedratico = {
        nombre: req.body.nombre,
        departamento: req.body.departamento,
        correo: req.body.correo,
        telefono: req.body.telefono
    };

    Catedratico.create(catedratico)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el catedrático."
            });
        });
};

// Obtener todos los catedráticos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Catedratico.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los catedráticos."
            });
        });
};

// Obtener un catedrático por nombre
exports.findOneByName = (req, res) => {
    const nombre = req.params.nombre;

    Catedratico.findOne({ where: { nombre: nombre } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el catedrático con nombre=" + nombre
            });
        });
};

// Actualizar un catedrático por nombre
exports.updateByName = (req, res) => {
    const nombre = req.params.nombre;

    Catedratico.update(req.body, { where: { nombre: nombre } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Catedrático actualizado correctamente." });
            } else {
                res.send({
                    message: `No se pudo actualizar el catedrático con nombre=${nombre}. Quizá no se encontró o el cuerpo está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar catedrático con nombre=" + nombre
            });
        });
};

// Eliminar un catedrático por nombre
exports.deleteByName = (req, res) => {
    const nombre = req.params.nombre;

    Catedratico.destroy({ where: { nombre: nombre } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Catedrático eliminado correctamente!" });
            } else {
                res.send({
                    message: `No se pudo eliminar el catedrático con nombre=${nombre}. Quizá no se encontró!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el catedrático con nombre=" + nombre
            });
        });
};

// Eliminar todos los catedráticos
exports.deleteAll = (req, res) => {
    Catedratico.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} catedráticos fueron eliminados correctamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar todos los catedráticos."
            });
        });
};
