const db = require("../models");
const Estudiante = db.Estudiante; // Asegúrate de que el modelo se llame Estudiante
const Op = db.Sequelize.Op;

// Crear un nuevo estudiante
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
        estado: req.body.estado || "activo"
    };

    Estudiante.create(estudiante)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Ocurrió un error al crear el estudiante."
        }));
};

// Obtener todos los estudiantes (búsqueda opcional por nombre)
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Estudiante.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Ocurrió un error al recuperar los estudiantes."
        }));
};

// Obtener un estudiante por carnet
exports.findOneByCarnet = (req, res) => {
    const carnet = req.params.carnet;

    Estudiante.findOne({ where: { carnet: carnet } })
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: `No se encontró estudiante con carnet=${carnet}` });
        })
        .catch(err => res.status(500).send({
            message: "Error al recuperar estudiante con carnet=" + carnet
        }));
};

// Actualizar un estudiante por carnet
exports.updateByCarnet = (req, res) => {
    const carnet = req.params.carnet;

    Estudiante.update(req.body, { where: { carnet: carnet } })
        .then(num => {
            if (num == 1) res.send({ message: "Estudiante actualizado correctamente." });
            else res.send({ message: `No se pudo actualizar estudiante con carnet=${carnet}.` });
        })
        .catch(err => res.status(500).send({
            message: "Error al actualizar estudiante con carnet=" + carnet
        }));
};

// Eliminar un estudiante por carnet
exports.deleteByCarnet = (req, res) => {
    const carnet = req.params.carnet;

    Estudiante.destroy({ where: { carnet: carnet } })
        .then(num => {
            if (num == 1) res.send({ message: "Estudiante eliminado correctamente!" });
            else res.send({ message: `No se pudo eliminar estudiante con carnet=${carnet}.` });
        })
        .catch(err => res.status(500).send({
            message: "Error al eliminar estudiante con carnet=" + carnet
        }));
};

// Eliminar todos los estudiantes
exports.deleteAll = (req, res) => {
    Estudiante.destroy({ where: {}, truncate: false })
        .then(nums => res.send({ message: `${nums} estudiantes eliminados correctamente!` }))
        .catch(err => res.status(500).send({
            message: err.message || "Ocurrió un error al eliminar todos los estudiantes."
        }));
};

// Obtener todos los estudiantes activos
exports.findAllActivos = (req, res) => {
    Estudiante.findAll({ where: { estado: "activo" } })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Ocurrió un error al obtener los estudiantes activos."
        }));
};
