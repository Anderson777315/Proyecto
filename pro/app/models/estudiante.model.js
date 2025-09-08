module.exports = (sequelize, Sequelize) => {
    const Estudiante = sequelize.define("estudiante", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false
        },
        correo: {
            type: Sequelize.STRING,
            unique: true, // correo único para cada estudiante
            validate: {
                isEmail: true
            }
        },
        carnet: {
            type: Sequelize.STRING,
            unique: true, // el carnet no se repite
            allowNull: false
        },
        fechanacimiento: {
            type: Sequelize.DATEONLY
        },
        numerocel: {
            type: Sequelize.STRING
        },
        carrera: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.ENUM("activo", "egresado", "suspendido", "retirado"),
            defaultValue: "activo"
        }
    });

    return Estudiante;
};