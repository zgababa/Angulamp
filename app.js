// Import des modules
var express = require('express');
var winston = require('winston');

// Configuration de l'application
var app = express();
require('./server/lib/config').config(app, express);

// Configuration des logs
require('./server/lib/log').setup(winston);

// Définition des routes
require('./server/lib/routes').setup(app);

// Initialise la lampe niveau hardware
var setup = require('./server/controller/init');

// On sert le html
app.use(express.static(__dirname + '/web'));

/** On contrôle arduino **/
var arduino = require('module_leds');
launch      = arduino();
var board   = launch.construct();
board.on("ready", function() {
	// Lancement du serveur
	setup.init("52e8b440e5cd058e5bdcca1c");
	app.listen(process.env.port || 8080);
	console.log('Serveur sur le port 8080');
});