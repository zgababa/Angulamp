// Connexion à la BDD
var mongoose = require('mongoose');
var lampModel = require('../lib/connect').lampModel;

// Initialise la lampe en fonction de la BDD
exports.init = function(id){
	lampModel.findById(id, function (err, comms) {
	  if (err){ throw new Error(err); helpers.send(404, res, "Erreur list lamp"); }
	  else
	  {
	   	launch.color(comms.color);
   		launch.clock(new Date());
	  }
	});
	
}
