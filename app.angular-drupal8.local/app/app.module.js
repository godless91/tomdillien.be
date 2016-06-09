angular.module('myPortfolio',  [
	'ngRoute',
	'ngAnimate',
    'ngSanitize',
	'ui.router', 
	'ui.bootstrap',
	'angularModalService',
	'easypiechart',
    'ngMessages',
    'templates',
	// Components
	'cslider',
	'introBlock',
	'latestWorks',
	'clients',
	'cityBlock',
	'timeline',
	'skills',
	'navigation',
    'services'
]).
controller('homeCtrl', ['$scope', /**
 * Home view controller
 * @param {Object} $scope
 */
function($scope) {
   // function content
}])
;
