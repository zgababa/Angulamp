var mongoose = require('mongoose');

// On créer et exporte les schéma
var playlistSchema = new mongoose.Schema({
  name : String,
  genre: String,
  songs : [{author : String, title : String, genre : String, src : String, format : String}],
  time : Date
});

var ambianceSchema = new mongoose.Schema({
  name :   String,
  repeat : Boolean,
  hour :   Date,
  playlists : [{name : String, genre : String, time : Date, nbMusic : Number, 
               songs : [{author : String, title : String, genre : String}]  }],
  colors : [{num : Number, value : String}]
});

var lampSchema = new mongoose.Schema({
  name  : String,
  color : String,
  alarm : Date
});

exports.playlistSchema = playlistSchema; 
exports.ambianceSchema = ambianceSchema;
exports.lampSchema = lampSchema;
