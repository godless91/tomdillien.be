angular.
  module('timeline').
  component('timeline', {
    templateUrl: '/components/timeline/timeline.template.html',
    controller: ['$http', 'drupalBaseUrl',
    	function TimelineController($http, $drupalBaseUrl) {
        	var self = this;

          var timeline = localStorage.getItem('timeline');
            if (!timeline) {
  	        $http({
  	          method: 'GET',
  	          url: $drupalBaseUrl + '/timeline'
  	        }).then(function successCallback(response) {
              angular.forEach(response.data, function(value, key) {
                response.data[key].dataAnimation = 'slideInLeft';
                var even = key % 2;
                if (even){
                  response.data[key].dataAnimation = 'slideInRight';
                }
              });
              localStorage.setItem('timeline',  JSON.stringify(response.data));
  	          self.timeline = response.data;
  	          }, function errorCallback(response) {
  	            console.log(response);
  	        });
           } else {
            self.timeline = JSON.parse(timeline);
          }
    	}
    ]
  })
  .directive('timelinePostRepeatDirective', function() {
    return function(scope, element, attrs) {
      if (scope.$last){
        //Load in timeline  script.
        var s = document.createElement('script');
        s.src = '/components/timeline/js/timeline.js';
        
        document.body.appendChild(s);
         
     }
    }
});