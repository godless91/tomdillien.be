angular.module('myPortfolio').
	config(['$locationProvider', '$routeProvider',
    	function config($locationProvider, $routeProvider) {
	  		$locationProvider.html5Mode(true);
	  		$locationProvider.hashPrefix('!');
      	}
  	]).
  	filter('htmlToPlaintext', function() {
	    return function(text) {
	      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
	    };
	}).
	constant('drupalBaseUrl', 'http://cms.angular-drupal8.local')
;
