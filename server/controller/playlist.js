/* Gère l'API PLAYLIST */
var helpers 	  = require('../lib/helpers');
var mongoose 	  = require('mongoose');
var playlistModel = require('../lib/connect').playlistModel;
var multiparty 	  = require('multiparty');
var fs            = require('fs');

// Liste les playlists
exports.list = function(req, res){
	playlistModel.find(null, function (err, comms) {
	  if (err) {throw new Error(err); helpers.send(404, res, "Erreur list playlist"); }
	  else helpers.send(200, res, comms);
	});
}

// Crée une nouvelle playlist
exports.create = function(req, res){
	var songs = new Array();
	for(var i=0; i<req.body.songs.length ; i++)
	{
		songs.push({ author : req.body.songs[i].author, 
					 title  : req.body.songs[i].title, 
					 genre  : req.body.songs[i].genre,
					 src    : req.body.songs[i].src,
					 format : req.body.songs[i].format });
	}
	// On créé une instance du Model
	var playlist = new playlistModel({
			name: req.body.name,
			songs :  songs
		});
	// On le sauvegarde dans MongoDB !
	playlist.save(function (err) {
	  if (err) { throw new Error(err); helpers.send(500, res, "Erreur création playlist");}
 	  else helpers.send(201, res, "Playlist créée");
  	});

}

// Update le contenu d'une playlist
exports.update = function(req, res){
	playlistModel.update({_id : req.body.id}, {name : req.body.playlist.name, songs:req.body.playlist.songs}, function (err, comms) {
	  if (err){throw new Error(err); helpers.send(500, res, "Erreur update playlist"); }
	  else  helpers.send(200, res, comms);
	});
	
}

// Donne le contenu d'une playlist
exports.history = function(req, res){

	playlistModel.findById(req.params.id, function (err, comms) {
	  if (err) { throw new Error(err); helpers.send(404, res, "Erreur history playlist");}
	  else helpers.send(200, res, comms);
	});	
}

// Supprime une playlist
exports.delete = function(req, res){

	playlistModel.remove({ _id : req.params.id }, function (err) {
		if (err){ throw new Error(err); helpers.send(500, res, "Erreur suppression playlist");}
		else helpers.send(200, res, req.params.id+" supprimé");
	});
}
exports.upload =  function (req, res) {
	var form = new multiparty.Form({ uploadDir: './web/data'});

	form.parse(req, function(err, fields, files) {
		if(err)
		{
			console.warn(err)
			helpers.send('500',res,'ERROR PARSE MUSIC');
		}
	});
    form.on('file', function(name, file) {
		fs.rename(file.path, form.uploadDir + "/" + file.originalFilename, function (err) {
		    if(err)
		    {
		    	console.warn(err)
		    	helpers.send('500',res,'ERROR RENAME MUSIC');
		    }
		  });
		helpers.send('200', res, 'OK');
			
    });
    form.on('error', function(err) {
    	if(err)
    	{
    		console.warn(err)
    		helpers.send('500',res,'ERROR UPLOAD MUSIC');
    	}
    });

}