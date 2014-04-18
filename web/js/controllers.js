'use strict';

// Controllers
var p14Controllers = angular.module('p14Controllers', ['ui.bootstrap']);

p14Controllers.controller('ColorCtrl', function($scope, Lamp) {
  // On inclu les méthode de nos directives qui ont un scope isolé
  $scope.color = {};
  $scope.initColor = "#FFFFFF"
  var etatLampe = false;

  angular.element(document).ready(function () {
    Lamp.query({id : "52e8b440e5cd058e5bdcca1c"}, function(data){
       $scope.color.setColor(data.color)
       if(data.color != "#000000")
       {
         $scope.switchStatus = true;
         etatLampe = true;
         $scope.color.setCursor(data.color);
       } 
    });
  });
    
  

  // Si on bascule l'état de la lampe
  $scope.switchState = function(lampOff){
    etatLampe = !lampOff;
    if(lampOff)
    {
      $scope.color.setColor('#000000');
      var lamp = {color : "#000000"};
      Lamp.update({id : "52e8b440e5cd058e5bdcca1c", lamp : lamp});
    }
    else
    {
      $scope.color.setColor($scope.color.getColor());
      var lamp = {color : $scope.color.getColor()};
      Lamp.update({id : "52e8b440e5cd058e5bdcca1c", lamp : lamp});
    }
  }

  // Lumière blanche + allume la lampe
  $scope.on = function()
  {
    $scope.color.setColor('#FFFFFF');
    $scope.switchStatus = true;
    etatLampe = true;
    var lamp = {color : "#FFFFFF"};
    Lamp.update({id : "52e8b440e5cd058e5bdcca1c", lamp : lamp});
  }

  // Si la lampe on, et on change sa couleur
  $scope.update = function()
  {
    if(etatLampe)
    {
     $scope.color.setColor($scope.color.getColor());
     var lamp = {color : $scope.color.getColor()};
     Lamp.update({id : "52e8b440e5cd058e5bdcca1c", lamp : lamp});
    }
  }
});


p14Controllers.controller('TimepickerDemoCtrl', function($scope, Lamp) {

  $scope.myTime = new Date();
  $scope.alarmClock = new Date(0,0);
  $scope.hstep2 = 1;
  $scope.mstep2 = 1;


  var etatReveil = false;

  $scope.changed = function(){
    var alarm = $scope.myTime.getTime();
    var lamp = {alarm : alarm};
    Lamp.update({id : "52e8b440e5cd058e5bdcca1c", lamp : lamp});
  };
 /* $scope.switchState = function(etat){
    etatReveil = !etat;
    if(etatReveil)
    {
      var alarm = new Date();
      alarm.setHours($scope.alarmClock.queryHours()+1);
      alarm.setMinutes($scope.alarmClock.queryMinutes());
      var lamp = {alarm : alarm};
      Lamp.update({id : "52e8b440e5cd058e5bdcca1c", lamp : lamp});
    }

  }

  $scope.updateAlarm = function() {
    var alarm = new Date();
    alarm.setHours($scope.alarmClock.queryHours()+1);
    alarm.setMinutes($scope.alarmClock.queryMinutes());
    var lamp = {alarm : alarm};
    if(etatReveil)
     Lamp.update({id : "52e8b440e5cd058e5bdcca1c", lamp : lamp});
  }*/



});























p14Controllers.controller('ProgressDemoCtrl', function($scope, $rootScope) {  
  $scope.playlist = [];
  $scope.audioPlayer= [];
  $scope.open = true;
  $scope.currentSong = "";

  $scope.addPlaylist = function(arrayAudioElement) {
    var name = arrayAudioElement.name
    $scope.playlist[name] = new Array();
    $scope.audioPlayer[name] = new Array();

    for(var i = 0; i< arrayAudioElement.songs.length; i++)
    {
      $scope.playlist[name].push(angular.copy(arrayAudioElement.songs[i]));
    }
  } 

  $scope.pause = function(){
    pause();
  }
  $scope.playSong = function(index, song, audioPlayer) {
    pause();
    audioPlayer.play(index);
    $scope.currentSong = song;
  }

  // Met en pause ce qui était play
  function pause()
  {
    var obj = $scope.audioPlayer, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key))
      {
        obj[key].pause();
      }        
    }
  }  
});


p14Controllers.controller('AccordionDemoCtrl', function($scope, Playlist) {  

  $scope.oneAtATime = true;
  $scope.groups = Playlist.get();
});

p14Controllers.controller('TabsDemoCtrl', function($scope, $http, Playlist) 
{  
  $scope.data = {}; 
  $scope.navType = 'pills';
});


p14Controllers.controller('ModalDemoCtrl', function($scope, $modal, Playlist) {  
    
  var edit = false;
  $scope.open = function (mode, index) {
    var modalInstance = $modal.open({
      templateUrl: 'views/createAPlaylist.html',
      controller: 'FormPlaylist',
      resolve: {
        playlist: function()
        {
          if(mode == "edit")
          {          
            edit = true;
            return { 
                    // Passage par valeur
                     title : "Édition de la",
                     name  :  angular.copy($scope.$parent.groups[index].name),
                     songs :  angular.copy($scope.$parent.groups[index].songs),
                     _id   :  angular.copy($scope.$parent.groups[index]._id),
                     index :  index
                    };
          }
          else {
            edit = false;
            return {
                    title :"Nouvelle",
                    name  :  "",
                    songs :  []
                   };
          }
        }
      }
    });

    modalInstance.result.then(function (obj) {
      if(edit)
      { 
        if(obj.deleted)
        {
          Playlist.remove({id : obj.playlist._id});
          $scope.$parent.$parent.$parent.$parent.groups.splice(obj.playlist.index, 1);
        } 
        else
        {
          Playlist.update({id : obj.playlist._id, playlist : obj.playlist});
          // Un peu crad...
          $scope.$parent.$parent.$parent.$parent.groups = Playlist.get(); 
        }
      }
      else
      { 
        Playlist.post(obj.playlist);
        console.warn($scope)
        $scope.$parent.groups = Playlist.get();
      }

    })
  };
});

p14Controllers.controller('FormPlaylist', function($scope, $modalInstance, $upload, playlist) {  
  

  // Passage par valeur
  var original = angular.copy(playlist);
  $scope.playlist = playlist;
  $scope.percent = 0;

  $scope.onFileSelect = function($files, array) {
     $scope.percent = 0;
     //$files: an array of files selected, each file has name, size, and type.
     for (var i = 0; i < $files.length; i++) {
       var file = $files[i];
       $scope.upload = $upload.upload({
         url: '/api/upload', //upload.php script, node.js route, or servlet url
         method: "POST",// or PUT,
         data: {},
         // headers: {'headerKey': 'headerValue'}, withCredential: true,
         file: file,
         fileFormDataName: 'file'
         // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
         /* set file formData name for 'Content-Desposition' header. Default: 'file' */
         //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
         /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
         //formDataAppender: function(formData, key, val){} 
       }).progress(function(evt) {
           var percent = parseInt(100.0 * evt.loaded / evt.total);
           $scope.percent = percent;
       }).success(function(data, status, headers, config) {
         // file is uploaded successfully
         var path = 'data/'+config.file.name;
         // On ajoute le chemin au son
         array[array.length-1].src = path;

       }).error(function(err){console.warn(err)});
     }
   };
      
  $scope.ok = function () {
    var objet = {playlist : angular.copy($scope.playlist), deleted : false}
    $modalInstance.close(objet);
  };

  $scope.cancel = function () {
    // Reset de la playlist
    playlist = angular.copy(original);
    $modalInstance.dismiss('cancel');
  };

  $scope.deleteSong = function(array, arrayID) {
    array.splice(arrayID, 1);
  }

  $scope.deletePlaylist = function(){
    var deletePlaylist = confirm('Êtes-vous sûr de vouloir supprimer cette playlist ?');   
    if (deletePlaylist) {
      var objet = {playlist : angular.copy($scope.playlist), deleted : true}
      $modalInstance.close(objet);
    }
  }
  /*$scope.addSong = function(array, title, author) {
    array.push({title : title, author:author });
    $scope.$apply();
  }*/



});





























p14Controllers.controller('ModalAmbianceCtrl', function($scope, $modal, $log) {  

  $scope.open = function (mode) 
  {
    var modalInstance = $modal.open({
      templateUrl: 'views/createAnAmbiance.html',
      controller: 'ModalAmbianceWindowCtrl',
      resolve: {
        ambiance: function () {
        	if(mode == "edit")
          {	return { title : "Édition",
          				   name : "Love",
          				   color :
          				   [{id : "1",value : "#FFDF75" },
          				    {id : "2",value : "#000000"},
                      {id : "3",value : "#FDA430"},
                      {id : "4",value : "#123456"}],	          		
          				   playlist : "opera",
          				   replay : true
          				 };
          }
          else
          		return {title :"Création"};
        }
      }
    });
  };

});

p14Controllers.controller('ModalAmbianceWindowCtrl', function($scope, $modalInstance, ambiance) {  

  $scope.ambiance = ambiance;
  $scope.playlists = 
  [
    {id:"classique", name:"Classique"},
    {id:"opera", name : "Opéra"},
    {id:"metal", name : "Métal"}
  ];


  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.deleteColor = function (array, id) {
    array.splice(id, 1);
  };

  $scope.addColor = function (array) {

    if(typeof array == 'object')
      array.push({id : "5",value : "#FDA430"});
    else
    {
      array = new Array();
      array[0] = {id : "1",value : "#FAF430"};
      $scope.ambiance.color = array;
    }
  };

});

