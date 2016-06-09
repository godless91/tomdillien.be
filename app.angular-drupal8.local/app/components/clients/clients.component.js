angular.
  module('clients').
  component('clients', {
    templateUrl: '/components/clients/clients.template.html',
    controller: ['$http', 'drupalBaseUrl',
      function LatestWorksController($http, $drupalBaseUrl) {
        var self = this;

        $http({
          method: 'GET',
          url: $drupalBaseUrl + '/clients'
        }).then(function successCallback(response) {
            self.clients = response.data;
          }, function errorCallback(response) {
            console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

      }
    ]
  })
  .directive('clientsPostRepeatDirective', function() {
    return function(scope, element, attrs) {
      // If all works are looped and added to template, add jquery ini.
      if (scope.$last){
        // // Load in portfolio init script.
        // var s = document.createElement('script');
        // s.src = '/components/clients/js/clients.init.js';
        // document.body.appendChild(s);
         
      }
    }
  });