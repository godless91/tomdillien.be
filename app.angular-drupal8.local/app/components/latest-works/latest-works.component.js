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
                console.log(response.data[0]);
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
              var arrTags = new Array();
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
        var s = document.createElement('script');
        s.src = '/components/latest-works/js/portfolio.init.js';
        document.body.appendChild(s);
         
      }
    }
  })
;