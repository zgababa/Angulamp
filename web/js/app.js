'use strict';

/* App Module */

var p14 = angular.module('p14', [
  'ngRoute',
  'p14Controllers',
  'p14Services',
  'p14Directives',
  'angularFileUpload',
  'audioPlayer'
]);

p14.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
