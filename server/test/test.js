var request = require('supertest');
var should = require('should');
var assert = require('assert');
var setup = require('./setup');

describe('Routing', function(){

  

  it('Retourne la liste de toutes les lampes', function(done){
  request('http://localhost:8080')
  .get('/api/lamp')
  .set('Accept', 'application/json')
  .end(function(err, res){
   res.should.have.status(200);
   done();
   });
  });

  it('Retourne la liste de toutes les playlists', function(done){
  request('http://localhost:8080')
  .get('/api/playlist')
  .set('Accept', 'application/json')
  .end(function(err, res){
	 res.should.have.status(200);
	 done();
	 });
  });

  it('Retourne la liste de toutes les ambiances', function(done){
  request('http://localhost:8080')
  .get('/api/ambiance')
  .set('Accept', 'application/json')
  .end(function(err, res){
    res.should.have.status(200);
    done();
    });
  });

  it('Supprime une playlist', function(done){
  request('http://localhost:8080')
  .del('/api/playlist/52d70ec1d097bf102bba38be')
  .set('Accept', 'application/json')
  .end(function(err, res){
		res.should.have.status(200);
		done();
   	});
  });

   it('Retourne toute les playlists sauf avec id = 52d70ec1d097bf102bba38be', function(done){
   request('http://localhost:8080')
   .get('/api/playlist/')
   .set('Accept', 'application/json')
   .end(function(err, res){
   		res.should.have.status(200);
   		res.body.should.not.include("52d70ec1d097bf102bba38be")
   		done();
   	});
   });

   it('Modifie la playlist avec l id = 52d70ec52b63e42d2bd5ae46', function(done){
   request('http://localhost:8080')
   .put('/api/playlist/52d70ec52b63e42d2bd5ae46')
   .set('Accept', 'application/json')
   .end(function(err, res){
      res.should.have.status(200);
      done();
    });
   });
});