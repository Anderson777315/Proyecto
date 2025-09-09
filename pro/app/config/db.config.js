/*module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  port: process.env.DB_PORT || 5432
};*/
module.exports = {
  HOST: "ep-empty-forest-ady0bet7-pooler.c-2.us-east-1.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_fLvSnCP3RxU5",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  port: 5432, // puerto por defecto de PostgreSQL
  // SSL eliminado
};