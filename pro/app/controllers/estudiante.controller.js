const db = require("../models");
const Estudiante = db.estudiantes;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo Estudiante
exports.create = (req, res) => {
    if (!req.body.nombre || !req.body.apellido || !req.body.carnet) {
        res.status(400).send({
            message: "El nombre, apellido y carnet no pueden estar vacíos."
        });
        return;
    }

    const estudiante = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        carnet: req.body.carnet,
        fechanacimiento: req.body.fechanacimiento,
        numerocel: req.body.numerocel,
        carrera: req.body.carrera,
        estado: req.body.estado ? req.body.estado : "activo"
    };

    Estudiante.create(estudiante)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al crear el estudiante."
            });
        });
};

// Recuperar todos los estudiantes (con búsqueda opcional por nombre parcial)
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Estudiante.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener los estudiantes."
            });
        });
};

// Buscar un estudiante por NOMBRE (exacto)
exports.findOne = (req, res) => {
    const nombre = req.params.nombre;

    Estudiante.findOne({ where: { nombre: nombre } })
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: `No se encontró Estudiante con nombre=${nombre}` });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error recuperando Estudiante con nombre=" + nombre
            });
        });
};

// Actualizar estudiante por ID
exports.update = (req, res) => {
    const id = req.params.id;

    Estudiante.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Estudiante actualizado correctamente." });
            } else {
                res.send({
                    message: `No se pudo actualizar Estudiante con id=${id}. Tal vez no existe o el body está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando Estudiante con id=" + id
            });
        });
};

// Eliminar estudiante por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Estudiante.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Estudiante eliminado correctamente!" });
            } else {
                res.send({ message: `No se pudo eliminar Estudiante con id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error eliminando Estudiante con id=" + id
            });
        });
};

// Eliminar todos los estudiantes
exports.deleteAll = (req, res) => {
    Estudiante.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} estudiantes eliminados correctamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error eliminando todos los estudiantes."
            });
        });
};

// Buscar todos los estudiantes activos
exports.findAllActivos = (req, res) => {
    Estudiante.findAll({ where: { estado: "activo" } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error obteniendo estudiantes activos."
            });
        });
};