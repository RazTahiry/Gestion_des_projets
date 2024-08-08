require("dotenv").config();
const express = require("express");
const routes = require("./routes/routes");
const db = require("./models/index");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

db.sequelize
  .sync()
  .then(() => {
    console.log("Base de données connectée et modèles synchronisés.");
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données: ", err.message);
  });

app.use("/api/v1", routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Le serveur s’exécute sur le port ${PORT}`);
});
