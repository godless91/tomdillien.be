angular.
  module('skills').
  component('skills', {
    templateUrl: '/components/skills/skills.template.html',
    controller: ['$http', 'drupalBaseUrl',
      function SkillsController($http, $drupalBaseUrl) {
        var self = this;

        var skills = localStorage.getItem('skills');
        if (!skills) {
          $http({
            method: 'GET',
            url: $drupalBaseUrl + '/skills'
          }).then(function successCallback(response) {
              localStorage.setItem('skills',  JSON.stringify(response.data));
              self.skills = response.data;
            }, function errorCallback(response) {
              console.log(response);
          });
        } else {
          self.skills = JSON.parse(skills);
        }

      }
    ]
  })
  .controller('chartCtrl', ['$scope', function ($scope) {
        $scope.percent = $scope.skill.field_rate;
        $scope.options = {
            animate:{
                duration:3000,
                enabled:true
            },
            barColor:'#22A7F0',
            scaleColor:false,
            lineWidth:10,
            lineCap:'circle'
        };
    }])
  .directive('skillsPostRepeatDirective', function() {
    return function(scope, element, attrs) {

        // var s = document.createElement('script');
        // s.src = '/components/skills/js/doughnutit.init.js';
        // document.body.appendChild(s);
    }
  });