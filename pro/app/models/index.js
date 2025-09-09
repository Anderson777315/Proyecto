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
db.Curso = require("./curso.model.js")(sequelize, Sequelize);
db.Estudiante = require("./estudiante.model.js")(sequelize, Sequelize);
db.Asignacion = require("./asignacion.model.js")(sequelize, Sequelize);
db.Grado = require("./grado.model.js")(sequelize, Sequelize);
// Relaciones
// Relaciones correctas
// Relaciones correctas
db.Curso.belongsTo(db.Catedratico, { foreignKey: 'catedraticoCod' });
db.Catedratico.hasMany(db.Curso, { foreignKey: 'catedraticoCod' });

db.Asignacion.belongsTo(db.Estudiante, { foreignKey: 'studentID' });
db.Estudiante.hasMany(db.Asignacion, { foreignKey: 'studentID' });

db.Asignacion.belongsTo(db.Curso, { foreignKey: 'courseID' });
db.Curso.hasMany(db.Asignacion, { foreignKey: 'courseID' });

db.Grado.belongsTo(db.Estudiante, { foreignKey: 'studentID' });
db.Estudiante.hasMany(db.Grado, { foreignKey: 'studentID' });

db.Grado.belongsTo(db.Curso, { foreignKey: 'courseID' });
db.Curso.hasMany(db.Grado, { foreignKey: 'courseID' });

// Exportamos db para poder usarlo en otros archivos
module.exports = db;
