module.exports = (sequelize, Sequelize) => {
  const Nota = sequelize.define("grado", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cursoId: {                 
      type: Sequelize.INTEGER,
      allowNull: false
    },
    estudianteId: {           
      type: Sequelize.INTEGER,
      allowNull: false
    },
    parcial1: {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0
    },
    parcial2: {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0
    },
    exafinal: {                
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0
    },
    zona: {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0
    }
  });

  return Nota;
};