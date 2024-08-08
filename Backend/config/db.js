const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');

// Charger la configuration de Sequelize
const env = process.env.NODE_ENV || 'development';
const configPath = path.resolve(__dirname, '../config', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))[env];

// Déstructurer les informations de connexion
const { host, username, password, database } = config;

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: host,
  user: username,
  password: password,
});

// Run create database statement
connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`, function (err, results) {
  if (err) {
    console.error('Error creating database:', err);
  } else {
    console.log('Database created or already exists.');
  }
  // Close the connection
  connection.end();
});
