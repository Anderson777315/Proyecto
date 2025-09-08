const db = require("../models");
const Grado = db.grado;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo grado
exports.create = (req, res) => {
    if (!req.body.studentID || !req.body.courseID || req.body.nota == null || !req.body.tipoEvaluacion) {
        res.status(400).send({
            message: "studentID, courseID, nota y tipoEvaluacion son obligatorios"
        });
        return;
    }

    const grado = {
        studentID: req.body.studentID,
        courseID: req.body.courseID,
        nota: req.body.nota,
        tipoEvaluacion: req.body.tipoEvaluacion,
        fecha: req.body.fecha ? req.body.fecha : new Date(),
        porcentajePonderacion: req.body.porcentajePonderacion ? req.body.porcentajePonderacion : 100
    };

    Grado.create(grado)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el grado."
            });
        });
};

// Obtener todos los grados
exports.findAll = (req, res) => {
    const tipoEvaluacion = req.query.tipoEvaluacion;
    const condition = tipoEvaluacion ? { tipoEvaluacion: { [Op.iLike]: `%${tipoEvaluacion}%` } } : null;

    Grado.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener los grados."
            });
        });
};

// Obtener un grado por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Grado.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al obtener el grado con id=" + id
            });
        });
};

// Actualizar un grado por id
exports.update = (req, res) => {
    const id = req.params.id;

    Grado.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "El grado se actualizó correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar el grado con id=${id}. Puede que no exista o que el cuerpo de la solicitud esté vacío.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar el grado con id=" + id
            });
        });
};

// Eliminar un grado por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Grado.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "El grado se eliminó correctamente." });
            } else {
                res.send({ message: `No se pudo eliminar el grado con id=${id}. Puede que no exista.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrió un error al eliminar el grado con id=" + id });
        });
};

// Eliminar todos los grados
exports.deleteAll = (req, res) => {
    Grado.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} grados fueron eliminados correctamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar todos los grados."
            });
        });
};

// Obtener todos los grados de un estudiante específico
exports.findAllByStudent = (req, res) => {
    const studentID = req.params.studentID;

    Grado.findAll({ where: { studentID: studentID } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al obtener los grados del estudiante con id=" + studentID
            });
        });
};

// Obtener todos los grados de un curso específico
exports.findAllByCourse = (req, res) => {
    const courseID = req.params.courseID;

    Grado.findAll({ where: { courseID: courseID } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al obtener los grados del curso con id=" + courseID
            });
        });
};