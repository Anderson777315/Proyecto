const db = require("../models");
const Asignacion = db.asignacion;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva Asignación
exports.create = (req, res) => {
    if (!req.body.studentID || !req.body.courseID) {
        res.status(400).send({
            message: "El studentID y el courseID no pueden estar vacíos"
        });
        return;
    }

    const asignacion = {
        studentID: req.body.studentID,
        courseID: req.body.courseID,
        fechaInscripcion: req.body.fechaInscripcion ? req.body.fechaInscripcion : new Date(),
        estado: req.body.estado ? req.body.estado : 'inscrito'
    };

    Asignacion.create(asignacion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la asignación."
            });
        });
};

// Obtener todas las asignaciones
exports.findAll = (req, res) => {
    const estado = req.query.estado;
    const condition = estado ? { estado: { [Op.iLike]: `%${estado}%` } } : null;

    Asignacion.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener las asignaciones."
            });
        });
};

// Obtener una asignación por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Asignacion.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al obtener la asignación con id=" + id
            });
        });
};

// Actualizar una asignación por id
exports.update = (req, res) => {
    const id = req.params.id;

    Asignacion.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "La asignación se actualizó correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar la asignación con id=${id}. Puede que no exista o que el cuerpo de la solicitud esté vacío.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar la asignación con id=" + id
            });
        });
};

// Eliminar una asignación por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Asignacion.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "La asignación se eliminó correctamente." });
            } else {
                res.send({ message: `No se pudo eliminar la asignación con id=${id}. Puede que no exista.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrió un error al eliminar la asignación con id=" + id });
        });
};

// Eliminar todas las asignaciones
exports.deleteAll = (req, res) => {
    Asignacion.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} asignaciones fueron eliminadas correctamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar todas las asignaciones."
            });
        });
};

// Obtener todas las asignaciones con estado 'inscrito'
exports.findAllByEstado = (req, res) => {
    Asignacion.findAll({ where: { estado: 'inscrito' } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener las asignaciones."
            });
        });
};