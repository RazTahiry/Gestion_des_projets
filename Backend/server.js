require("dotenv").config();
const express = require("express");
const routes = require("./routes/routes");
const db = require("./models/index");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

db.sequelize
  .sync()
  .then(() => {
    console.log("Base de données connectée et modèles synchronisés.");
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données: ", err);
  });

app.use("/api/v1", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Le serveur s’exécute sur le port ${PORT}`);
});
