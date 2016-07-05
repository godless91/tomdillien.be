angular.module('cityBlock', ['angularModalService', 'templates']);
angular.
  module('cityBlock').
  component('cityBlock', {
    templateUrl: '/components/city-block/city-block.template.html',
    controller: ['$http', 'ModalService', 'drupalBaseUrl',
    	function CityBlockController($http, ModalService, drupalBaseUrl) {
        	var self = this;

        	self.showContactModal = function($id) {
	          // Just provide a template url, a controller and call 'showModal'.
	          ModalService.showModal({
	            templateUrl: "/components/city-block/contact-form.template.html",
	            controller: function($scope, close) {
				    $scope.submitForm = function(contactform) {
						// check to make sure the form is completely valid
						if (contactform.$valid) {
							console.log($scope.formData);
						   $http({
								method  : 'POST',
								url     : drupalBaseUrl + '/contact-form-process',
								data    : $.param($scope.formData),  //param method from jQuery
								headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
							}).success(function(data){
							   console.log(data);
							   console.log('success');
								if (data.success) { //success comes from the return json object
									$scope.submitButtonDisabled = true;
									$scope.formHidden = true;
									$scope.resultMessage = data.message;
									$scope.result= 'bg-success';
								} else {
									console.log('false');
									$scope.submitButtonDisabled = false;
									$scope.resultMessage = data.message;
									$scope.result='bg-danger';
								}
							});
						}
				    }

	              $scope.close = function(result) {
	                // Fix for backdrop not deleting itself.
	                $('.modal-backdrop').remove();
	                close(result, 500); // close, but give 500ms for bootstrap to animate
	              };
	            }
	          }).then(function(modal) {
	            modal.element.modal();
	          });
	        };
    	}
    ]
  });
angular.module('clients', ['templates']);
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
angular.module('cslider', ['templates']);
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
angular.module('introBlock', ['templates']);
angular.
  module('introBlock').
  component('introBlockView', {
    templateUrl: '/components/intro-block/intro-block.template.html',
    controller: [
      function IntroBlockController() {
        var self = this;
        
      }
    ]
  });
angular.module('latestWorks', ['ui.router', 'ui.bootstrap', 'angularModalService', 'services', 'templates']);
angular.
  module('latestWorks').
  component('latestWorks', {
    templateUrl: '/components/latest-works/latest-works.template.html',
    controller: ['$http', 'ModalService', 'drupalBaseUrl' ,
      function LatestWorksController($http, ModalService, $drupalBaseUrl , close) {
        var self = this;

        self.showModal = function($id) {
          // Just provide a template url, a controller and call 'showModal'.
          ModalService.showModal({
            templateUrl: "/components/latest-works/latest-works-detail.template.html",
            controller: function($scope, close) {
              $http({
                method: 'GET',
                url: $drupalBaseUrl + '/latest-works/' + $id
              }).then(function successCallback(response) {
                  // Create array from other images comma seperated list.
                  $scope.strImages = response.data[0].field_other_images;
                  $scope.arrImages = new Array();
                  $scope.arrImages = $scope.strImages.split(',');

                   // Create array from tags comma seperated list.
                  $scope.strTags = response.data[0].field_tags;
                  $scope.arrTags = new Array();
                  $scope.arrTags = $scope.strTags.split(',');
                  
                  $scope.work = response.data;
                }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
              });
              $scope.close = function(result) {
                // Fix for backdrop not deleting itself.
                $('.modal-backdrop').remove();
                close(result, 500); // close, but give 500ms for bootstrap to animate
              };
            }
          }).then(function(modal) {
            modal.element.modal();
          });
        };

        var latestWorks = localStorage.getItem('latest_works');
        if (!latestWorks) {
          $http({
            method: 'GET',
            cache: true,
            url: $drupalBaseUrl + '/latest-works'
          }).then(function successCallback(response) {

            angular.forEach(response.data, function(item) {
              var strTags = item.field_tags;
              item.field_tags = strTags.split(',');
            });
            localStorage.setItem('latest_works',  JSON.stringify(response.data));
            self.works = response.data;
          }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
        } else {
          self.works = JSON.parse(latestWorks);
        }

      }
    ]
  }).
  directive('latestWorksPostRepeatDirective', function() {
    return function(scope, element, attrs) {
      // If all works are looped and added to template, add jquery ini.
      if (scope.$last){
        // Load in portfolio init script.
       /* var s = document.createElement('script');
        s.src = '/components/latest-works/js/portfolio.init.js';
        document.body.appendChild(s);*/
         
      }
    }
  })
;
angular.module('navigation', ['templates']);
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
angular.module('services', ['templates']);
/**
 * Simple favicon service
 */
 angular.
    module('services')
    // factory('favicoService', [
    //     function() {
    //         var favico = new Favico({
    //             animation : 'fade'
    //         });

    //         var badge = function(num) {
    //             favico.badge(num);
    //         };
    //         var reset = function() {
    //             favico.reset();
    //         };
            
    //         return {
    //             badge : badge,
    //             reset : reset,
    //             animation:'pop',
    //         };
    //     }
    // ])
;
angular.module('skills', ['easypiechart', 'templates']);
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
// Include a comment about why this seemingly unused module exists
angular.module('templates', []);

angular.module('timeline', ['ngSanitize', 'templates']);
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