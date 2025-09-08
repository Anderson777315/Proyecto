const db = require("../models");
const Catedratico = db.catedratico;
const Op = db.Sequelize.Op;

// Crear un nuevo Catedrático
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({ message: "El nombre no puede estar vacío!" });
        return;
    }

    const catedratico = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        especialidad: req.body.especialidad,
        telefono: req.body.telefono,
        estado: req.body.estado ? req.body.estado : "activo",
        fecha_ingreso: req.body.fecha_ingreso ? req.body.fecha_ingreso : null
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
                message: err.message || "Ocurrió un error al obtener los catedráticos."
            });
        });
};

// Obtener un catedrático por nombre
exports.findOne = (req, res) => {
    const nombre = req.params.nombre;

    Catedratico.findOne({ where: { nombre: nombre } })
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: "Catedrático no encontrado" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener catedrático con nombre=" + nombre
            });
        });
};

// Actualizar un catedrático por nombre
exports.update = (req, res) => {
    const nombre = req.params.nombre;

    Catedratico.update(req.body, { where: { nombre } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Catedrático actualizado correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar el catedrático con nombre=${nombre}. Quizá no se encontró.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar catedrático con nombre=" + nombre });
        });
};

// Eliminar un catedrático por nombre
exports.delete = (req, res) => {
    const nombre = req.params.nombre;

    Catedratico.destroy({ where: { nombre } })
        .then(num => {
            if (num == 1) res.send({ message: "Catedrático eliminado correctamente." });
            else res.send({ message: `No se encontró el catedrático con nombre=${nombre}.` });
        })
        .catch(err => {
            res.status(500).send({ message: "No se pudo eliminar catedrático con nombre=" + nombre });
        });
};

// Eliminar todos los catedráticos
exports.deleteAll = (req, res) => {
    Catedratico.destroy({ where: {}, truncate: false })
        .then(nums => res.send({ message: `${nums} catedráticos eliminados.` }))
        .catch(err => {
            res.status(500).send({ message: err.message || "Ocurrió un error al eliminar todos los catedráticos." });
        });
};

// Obtener todos los catedráticos activos
exports.findAllActive = (req, res) => {
    Catedratico.findAll({ where: { estado: "activo" } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ message: err.message || "Ocurrió un error al obtener catedráticos activos." });
        });
};
