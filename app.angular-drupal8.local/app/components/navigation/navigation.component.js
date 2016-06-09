angular.
  module('navigation').
  component('navigation', {
    templateUrl: '/components/navigation/navigation.template.html',
    controller: ['$http', 'drupalBaseUrl',
      function NavigationController($http, $drupalBaseUrl) {
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