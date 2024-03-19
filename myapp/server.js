// Importez les bibliothèques nécessaires
const express = require('express');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const cors = require('cors');


// Importez les routes pour la météo et le capteur
const weatherRoutes = require('./routes/weatherRoutes');
const sensorRoutes = require('./routes/sensorRoutes');

// Créez une nouvelle application Express
const app = express();
const port = 3000;
app.use(cors());

// Configurez le port série pour communiquer avec l'Arduino
// Remplacez '/dev/tty-ACM0' par le port de votre Arduino
//const arduinoPort = new SerialPort('/dev/tty-ACM0', { baudRate: 9600 });
//const parser = arduinoPort.pipe(new Readline({ delimiter: '\n' }));

// Stockez l'horaire d'irrigation dans une variable
let irrigationSchedule = '00:00';

// Stockez les données d'utilisation de l'eau dans une variable
let waterUsageData = [];

// Utilisez les routes pour la météo et le capteur
app.use('/api/weather', weatherRoutes);
app.use('/api/sensor', sensorRoutes);

// Créez une nouvelle route pour envoyer des commandes à l'Arduino
app.get('/api/control/:command', (req, res) => {
  // Récupérez la commande de l'URL
  const command = req.params.command;

  // Envoyez la commande à l'Arduino via le port série
  //arduinoPort.write(command + '\n');

  // Répondez avec un message de confirmation
  res.send({ status: 'Command sent: ' + command });
});

// Ajoutez une nouvelle route pour mettre à jour l'horaire d'irrigation
app.post('/api/schedule/:time', (req, res) => {
  irrigationSchedule = req.params.time;
  res.send({ status: 'Schedule updated: ' + irrigationSchedule });
});

// Ajoutez une nouvelle route pour récupérer les données d'utilisation de l'eau
app.get('/api/waterUsage', (req, res) => {
  res.send(waterUsageData);
});

// Démarrez le serveur
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});