const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:18"  // Puerto del frontend
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Importamos la base de datos
const db = require("./app/models");

// Sincronizamos los modelos con la base de datos
db.sequelize.sync();
// Si quieres reiniciar tablas: db.sequelize.sync({ force: true }).then(() => console.log("Drop and re-sync db."));

// Ruta simple de prueba
app.get("/", (req, res) => {
  res.json({ message: "Inicializacion de cursos" });
});

// Importamos las rutas
require("./app/routes/curso.routes")(app);
require("./app/routes/catedratico.routes")(app);

// Puerto y inicio del servidor
const PORT = process.env.PORT || 18;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
