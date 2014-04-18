var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/api');

// On importe les schéma pour créer les models
exports.playlistModel = mongoose.model('playlist', require('../model/schema.js').playlistSchema);
exports.ambianceModel = mongoose.model('ambiance', require('../model/schema.js').ambianceSchema);
exports.lampModel     = mongoose.model('lamp',     require('../model/schema.js').lampSchema);