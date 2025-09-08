module.exports = (sequelize, Sequelize) => {
    const Asignacion = sequelize.define("asignacion", {
        studentID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        courseID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fechaInscripcion: {
            type: Sequelize.DATE,
            allowNull: false
        },
        estado: {
            type: Sequelize.ENUM('inscrito', 'completado', 'cancelado'),
            defaultValue: 'inscrito'
        }
    });

    return Asignacion;
};