'use strict';

var app = angular.module("p14Directives", []);

app.directive("color", function() {
  return {
    restrict : "E",
    scope: {
      // @ car je passe juste un attribut
      box:"@",
      left:"@",
      top:"@",
      size:"@",
      // Je passe un objet avec un binding bi-directionnel
      control:"=",
      // J'appel une méthode du controlleur
      update:"&"

    },
    link: function(scope, element, attrs) {
               var setColor, color="#FFFFFF";
               var out = document.getElementById(scope.box),
                   reg = /^#(.)\1(.)\2(.)\3$/;
               // this is where colorpicker created
               var cp = Raphael.colorpicker(scope.left, scope.top, scope.size, color);
               
               out.onkeyup = function () {
                   cp.color(this.value);
               };
               // Update la couleur
               cp.onchange = function (clr) {
                  color = clr;
                  // On appel une méthode pour savoir si on appel setCOlor ou non
                  scope.update();
               };  
               scope.control.setCursor = function(clr){
                cp.color(clr);
               }
               // Retourne la couleur actuel
               scope.control.getColor = function(){
                  return color;
               };
               scope.control.setColor = setColor = function(clr)
               { 
                //cp.color(clr);
                out.value = clr.replace(reg, "#$1$2$3");
                out.style.background = clr;
                out.style.color = Raphael.rgb2hsb(clr).b < .5 ? "#fff" : "#000";
               }
           }
  }
});

app.directive('toggleSwitch', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      model: '=',
      onLabel: '@',
      offLabel: '@',
      knobLabel: '@',
      done : "&"
    },

    template: '<div class="switch" ng-click="toggle()"><div  ng-class="{\'switch-off\': !model, \'switch-on\': model}"><span class="switch-left" ng-bind-html-unsafe="onLabel">On</span><span class="knob" ng-bind="knobLabel">&nbsp;</span><span class="switch-right" ng-bind-html-unsafe="offLabel">Off</span></div></div>',
    link: function (scope, element, attrs) {
     attrs.$observe('onLabel', function(val) {
        scope.onLabel = angular.isDefined(val) ? val : 'On';
      });

      attrs.$observe('offLabel', function(val) {
        scope.offLabel = angular.isDefined(val) ? val : 'Off';
      });

      attrs.$observe('knobLabel', function(val) {
        
        scope.knobLabel = angular.isDefined(val) ? val : '\u00A0';
      });

      scope.toggle = function (val) {
        element.children().addClass('switch-animate');
        scope.model = !scope.model;
        scope.done();
      };  

    }
  };
});
/*app.directive('chooseColor', function () {
  return {
    replace:true,
    template: ' <color top="805" size="200" left="748"> </color>',
    link: function (scope, element, attrs) {
        /*for ( var i = 0; i < set1.length; i++)
        {
           var temp_circ = set1.pop();
           temp_circ.toFront();
           set1.splice(0, 0, temp_circ);
        }
      
    }
  };
});*/

app.directive('browseMusic', function () {
  return {
    scope: {
      action:"=",
      model: "="
    },
           
    // element correspond au template
    link: function (scope, element, attrs) {

        document.querySelector('input[type="file"]').onchange = function(er) {
        var reader = new FileReader();
        var file = this.files[0];

        reader.onload = function(e) {
          var dv = new jDataView(this.result);

          if (dv.getString(3, dv.byteLength - 128) == 'TAG') {
            var title = dv.getString(30, dv.tell());
            var artist = dv.getString(30, dv.tell());
            var album = dv.getString(30, dv.tell());
            var year = dv.getString(4, dv.tell());   
            var format = file.type;         

            title = title.replace(/[^\u000A\u0020-\u007E]/g, '');
            artist = artist.replace(/[^\u000A\u0020-\u007E]/g, '');
            album = album.replace(/[^\u000A\u0020-\u007E]/g, '');
            year = year.replace(/[^\u000A\u0020-\u007E]/g, '');
            
            if(title == '')
              title = file.name.replace(/.mp3$/g,'');

            // On ajoute au modal
            scope.$apply(scope.model.push({title:title, author:artist, format : format}));
            // ON déclenche la boucle digest, et on affecte ce scope au event
            //scope.$apply(attrs.action({title:title, author:artist}));
           // scope.action(scope.model, title, artist)
          } 
        };
        reader.readAsArrayBuffer(this.files[0]);

      };
      // Voir jsfiddle dans bookmark projet pour charger un dossier complet
     }
    };
  });
