 // Importez la bibliothèque 'serialport' pour communiquer avec l'Arduino
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// Configurez le port série - remplacez '/dev/tty-ACM0' par le port de votre Arduino
//const port = new SerialPort('/dev/tty-ACM0', { baudRate: 9600 });
//const parser = port.pipe(new Readline({ delimiter: '\n' }));

// Lisez les données du port série
/*parser.on('data', (data) => {
  console.log(data);
});*/

exports.getSensorData = (req, res) => {
  // Ici, vous pouvez lire les données du capteur d'humidité du sol
  // Pour cet exemple, nous renvoyons simplement une valeur fixe
  res.send({ humidity: 75 });
};