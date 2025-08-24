module.exports = {
  HOST: "ep-old-sunset-adsu0sy0-pooler.c-2.us-east-1.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_m1fLKashdcY7",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
