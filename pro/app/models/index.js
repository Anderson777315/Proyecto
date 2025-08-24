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
db.catedratico = require("./catedratico.model.js")(sequelize, Sequelize);
db.curso = require("./curso.model.js")(sequelize, Sequelize);

// Relaciones
db.curso.belongsTo(db.catedratico, { foreignKey: 'catedraticoCod' });
db.catedratico.hasMany(db.curso, { foreignKey: 'catedraticoCod' });
// Exportamos db para poder usarlo en otros archivos
module.exports = db;
