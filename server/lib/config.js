var fs = require('fs');

exports.config = function(app, express){
// Express configuration
 app.configure(function(){
 	process.env.NODE_ENV = 'development'; // or 'production' or 'test'

 	// development only
	if ('development' == app.get('env')) {
	   app.use(express.errorHandler());
    }
	// Log les accès web problème

	/*app.use(express.logger({stream: fs.createWriteStream('../logs/access.log', {flags:
	'a'}) }));*/

	// Permet de récupérer les variables envoyées en POST
	app.use(express.json());
	app.use(express.urlencoded());

	// Permet de monter par défaut les routes app.get(), app.post(), ...
	app.use(express.methodOverride());
	app.use(app.router);

	app.use(express.logger('dev'));

 });

}