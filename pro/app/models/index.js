// Cargamos la configuración de la base de datos
const dbConfig = require("../config/db.config.js");
// Importamos Sequelize
const Sequelize = require("sequelize");
// Inicializamos Sequelize con los datos de la BD
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Creamos el objeto db
const db = {};

// Guardamos Sequelize y la instancia
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importamos los modelos
db.Catedratico = require("./catedratico.model.js")(sequelize, Sequelize);
db.curso = require("./curso.model.js")(sequelize, Sequelize);

db.estudiante = require("./estudiante.model.js")(sequelize, Sequelize);
db.asignacion = require("./asignacion.model.js")(sequelize, Sequelize);
db.grado = require("./grado.model.js")(sequelize, Sequelize);

// Relaciones
// Relaciones correctas
db.curso.belongsTo(db.Catedratico, { foreignKey: 'catedraticoCod' });
db.Catedratico.hasMany(db.curso, { foreignKey: 'catedraticoCod' });

db.asignacion.belongsTo(db.estudiante, { foreignKey: 'studentID' });
db.estudiante.hasMany(db.asignacion, { foreignKey: 'studentID' });

db.asignacion.belongsTo(db.curso, { foreignKey: 'courseID' });
db.curso.hasMany(db.asignacion, { foreignKey: 'courseID' });

db.grado.belongsTo(db.estudiante, { foreignKey: 'studentID' });
db.estudiante.hasMany(db.grado, { foreignKey: 'studentID' });

db.grado.belongsTo(db.curso, { foreignKey: 'courseID' });
db.curso.hasMany(db.grado, { foreignKey: 'courseID' });

// Exportamos db para poder usarlo en otros archivos
module.exports = db;
