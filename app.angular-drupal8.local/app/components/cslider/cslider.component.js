angular.
  module('cslider').
  component('cslider', {
    templateUrl: '/components/cslider/cslider.template.html',
    controller: ['$http', 'drupalBaseUrl',
      function CsliderController($http, $drupalBaseUrl) {
        var self = this;

        $http({
          method: 'GET',
          url: $drupalBaseUrl + '/slider'
        }).then(function successCallback(response) {
            self.slides = response.data;
          }, function errorCallback(response) {
            console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

      }
    ]
  })
  .directive('csliderPostRepeatDirective', function() {
    return function(scope, element, attrs) {
      // If all slides are looped and added to template, add jquery ini.
      // if (scope.$last){
      //   $('#da-slider').cslider({
      //     autoplay  : true,
      //     bgincrement : 0,
      //     interval: 4000
      //   });
      // }
      var s = document.createElement('script');
      s.src = '/components/cslider/js/parallax.init.js';
      document.body.appendChild(s);

    }
  });