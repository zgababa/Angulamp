// Import de la librairie mettant en forme la réponse (JSON)
var helpers = require('../lib/helpers');
var mongoose = require('mongoose');
// Config de la connection à la base
var ambianceModel = require('../lib/connect').ambianceModel;


// Liste les ambiances
exports.list = function(req, res){
	ambianceModel.find(null, function (err, comms) {
	  if (err){ throw new Error(err); helpers.send(404, res, "Erreur list ambiance"); }
	  else helpers.send(200, res, comms);
	});
}

// Crée une nouvelle ambiance
exports.create = function(req, res){
	
	// On créé une instance du Model
	var ambiance = new ambianceModel({
		name: "Ambiance Amour",
		repeat: false,
		color : [
					{num : "1", value:"FF567D"},
					{num : "2",  value:"765DDA"}
				],
		playlist : [{name : "Playlist-Amour", genre : "Classique",  nbMusic : 2, 
               		 song : [
								{author : "Mozart", title:"Petite Musique de Nuit", genre : "Classique"},
								{author : "Verdi",  title:"Nabucco", genre : "Opéra"}
							] }]
		});

	// On le sauvegarde dans MongoDB !
	ambiance.save(function (err) {
	  if (err){throw new Error(err); helpers.send(500, res, "Erreur création ambiance"); }
 	  else helpers.send(201, res, "Playlist créée");
  	});
}

// Update le contenu d'une ambiance
exports.update = function(req, res){
	ambianceModel.update({_id : req.params.id}, { name : 'Love' }, function (err, comms) {
	  if (err){throw new Error(err); helpers.send(500, res, "Erreur update ambiance"); }
	  else helpers.send(200, res, comms);
	});
}

// Donne le contenu d'une ambiance
exports.history = function(req, res){
	ambianceModel.findById(req.params.id, function (err, comms) {
	  if (err) { throw new Error(err); helpers.send(404, res, "Erreur history lamp");}
	  else helpers.send(200, res, comms);
	});
}

// Supprime une ambiance
exports.delete = function(req, res){
	ambianceModel.remove({ _id : req.params.id }, function (err) {
		if (err){throw new Error(err); helpers.send(500, res, "Erreur suppression playlist");}
		else helpers.send(200, res, req.params.id+" supprimé");
		
	});
}