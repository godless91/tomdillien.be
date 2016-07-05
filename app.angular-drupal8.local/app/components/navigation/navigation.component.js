angular.
  module('navigation').
  component('navigation', {
    templateUrl: '/components/navigation/navigation.template.html',
    controller: ['$http', 'drupalBaseUrl', '$interval',
      function NavigationController($http, $drupalBaseUrl, $interval) {
        var self = this;

        $http({
          method: 'GET',
          url: $drupalBaseUrl + '/export/json/main-menu'
        }).then(function successCallback(response) {
            self.menu = response.data;
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        self.speechBubbleText = 'Welcome';
        var arrSpeechBubble = [];

        $http({
          method: 'GET',
          url: $drupalBaseUrl + '/technologies'
        }).then(function successCallback(response) {
          // Add all found terms to array.
          response.data.forEach(function($entry) {
            arrSpeechBubble.push($entry.name);
          });
          // Set interval on that array
          $interval(function () {
            self.speechBubbleText = arrSpeechBubble[Math.floor(Math.random() * arrSpeechBubble.length)];
          }, 3000);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

      }
    ]
  })
  .directive('navigationPostLoadDirective', function() {
    return function(scope, element, attrs) {

        var s = document.createElement('script');
        s.src = '/components/navigation/js/init.stickynav.js';
        document.body.appendChild(s);
    }
  });