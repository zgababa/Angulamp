// Import de la librairie mettant en forme la réponse (JSON)
var helpers = require('../lib/helpers');
var mongoose = require('mongoose');
// Config de la connection à la base
var lampModel = require('../lib/connect').lampModel;

// Liste les lampes
exports.list = function(req, res){
	lampModel.find(null, function (err, comms) {
	  if (err){ throw new Error(err); helpers.send(404, res, "Erreur list lamp"); }
	  else helpers.send(200, res, comms);
	});
}

// Crée une nouvelle lampes
exports.create = function(req, res){
	
	// On créé une instance du Model
	var lamp = new lampModel({
		name: "Lampe de Fabien",
		color: "#FFFFFF"
		});

	// On le sauvegarde dans MongoDB !
	lamp.save(function (err) {
	  if (err){ throw new Error(err); helpers.send(500, res, "ERROR TO CREATE LAMP"); }
 	  else helpers.send(201, res, "OK");
  	});
}

// Update le contenu d'une lampe
exports.update = function(req, res){
	// On update la couleur
	if(req.body.lamp.color)
		launch.color(req.body.lamp.color);
	// On chage l'heure
	if(req.body.lamp.alarm)
	{
		var time = new Date(parseInt(req.body.lamp.alarm));
		launch.clock(time);
	}

	
	lampModel.update({_id : req.params.id}, req.body.lamp, 
	function (err, comms) {
	  if (err) { throw new Error(err); helpers.send(500, res, "Erreur update lamp");}
	  else 
	  	helpers.send(200, res, comms);
	});
}

// Donne le contenu d'une lampes
exports.history = function(req, res){
	lampModel.findById(req.params.id, function (err, comms) {
	  if (err) { throw new Error(err); helpers.send(404, res, "Erreur history lamp");}
	  else { helpers.send(200, res, comms);}
	});	
}

// Supprime une lampe
exports.delete = function(req, res){
	lampModel.remove({ _id : req.params.id }, function (err) {
		if (err){ throw new Error(err); helpers.send(500, res, "Erreur suppression lamp");}
		else helpers.send(200, res, req.params.id+" supprimé");
		
	});
}