module.exports = (sequelize, Sequelize) => {
    const Grado = sequelize.define("grado", {
        courseID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        studentID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nota: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        tipoEvaluacion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        porcentajePonderacion: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 100
        }
    });

    return Grado;
};