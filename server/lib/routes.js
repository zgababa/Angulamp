var playlist = require('../controller/playlist');
var ambiance = require('../controller/ambiance');
var lamp = require('../controller/lamp');

exports.setup = function(app){

	// Playlist
	app.post('/api/playlist', playlist.create);
	app.get('/api/playlist', playlist.list);
	app.put('/api/playlist/:id', playlist.update);
	app.get('/api/playlist/:id', playlist.history);
	app.delete('/api/playlist/:id', playlist.delete);
	app.post('/api/upload', playlist.upload);
	
	// Ambiance
	app.post('/api/ambiance', ambiance.create);
	app.get('/api/ambiance', ambiance.list);
	app.put('/api/ambiance/:id', ambiance.update);
	app.get('/api/ambiance/:id', ambiance.history);
	app.delete('/api/ambiance/:id', ambiance.delete);
	
	// Lampe
	app.post('/api/lamp', lamp.create);
	app.get('/api/lamp', lamp.list);
	app.put('/api/lamp/:id', lamp.update);
	app.get('/api/lamp/:id', lamp.history);
	app.delete('/api/lamp/:id', lamp.delete);


};