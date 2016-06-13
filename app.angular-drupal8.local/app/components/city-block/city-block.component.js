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
				    	console.log(contactform);
						// check to make sure the form is completely valid
						if (contactform.$valid) {
							console.log($scope.formData);
						   $http({
								method  : 'POST',
								url     : drupalBaseUrl + '/contact-form-process',
								data    : $.param($scope.formData),  //param method from jQuery
								headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
							}).success(function(data){
								if (data.success) { //success comes from the return json object
									$scope.submitButtonDisabled = true;
									$scope.formHidden = true;
									$scope.resultMessage = data.message;
									$scope.result= 'bg-success';
								} else {
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