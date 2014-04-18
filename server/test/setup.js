var mongoose = require('mongoose');
// Config de la connection à la base
var mongo = require('../lib/connect');

exports.init = function(callback){
	  

}
exports.clean = function(){
	mongoose.connection.close();
}