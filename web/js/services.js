'use strict';

var p14Services = angular.module('p14Services', ['ngResource']);

p14Services.factory('Playlist', ['$resource',
  function($resource){
    return $resource('/api/playlist/:id', {id: "@id"}, {
      get   : {method:'GET', isArray:true},
      query : {method:'GET',  params: {id: '@id'}},
      post  : {method:'POST', params:{name:'@name'}},
      update: {method:'PUT', params: {id: '@id'}},
      remove: {method:'DELETE', params: {id: '@id'}},
    });
  }] );

p14Services.factory('Ambiance', ['$resource',
  function($resource){
    return $resource('/api/ambiance/:id', {id: "@id"}, {
      get   : {method:'GET', isArray:true},
      query : {method:'GET',  params: {id: '@id'}},
      post  : {method:'POST', params:{name:'@name'}},
      update: {method:'PUT', params: {id: '@id'}},
      remove: {method:'DELETE', params: {id: '@id'}}
    });
  }]);

p14Services.factory('Lamp', ['$resource',
  function($resource){
    return $resource('/api/lamp/:id', {id: "@id"}, {
      get   : {method:'GET', isArray:true},
      query : {method:'GET'},
      post  : {method:'POST', params:{name:'@name'}},
      update: {method:'PUT'},
      remove: {method:'DELETE'},
    });
  }] );
