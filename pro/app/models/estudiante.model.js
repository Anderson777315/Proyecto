module.exports = (sequelize, Sequelize) => {
  const Estudiante = sequelize.define("estudiante", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING
    },
    apellido: {
      type: Sequelize.STRING
    },
    correo: {
      type: Sequelize.STRING
    },
    carnet: {
      type: Sequelize.STRING
    },
    fechanacimiento: {
      type: Sequelize.DATE
    },
    numeroCel: {
      type: Sequelize.STRING
    },
    carrera: {
      type: Sequelize.STRING
    },
    estado: {
      type: Sequelize.STRING
    },
    semestre: {   
      type: Sequelize.INTEGER
    }
  });
  return Estudiante;
};