const express = require('express');
const sensorController = require('../controllers/sensorController');

const router = express.Router();

// Ajoutez une nouvelle route pour lire les données du capteur
router.get('/humidity', sensorController.getSensorData);

module.exports = router;