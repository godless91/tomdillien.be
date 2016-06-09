angular.module('navigation', ['templates']).
	controller('navigationCtrl', function($scope, $location, $interval) {
    $scope.speechBubbleText = 'Welcome';
    var arrSpeechBubble = [
    	"PHP",
    	"Javascript",
    	"jQuery",
    	"Drupal7",
    	"Drupal8",
    	"Symfony2",
    	"AngularJs",
    	"Gruntjs",
    	"Gulpjs",
    	"HTML5",
    	"CSS3"
    ];
    $interval(function () {
        $scope.speechBubbleText = arrSpeechBubble[Math.floor(Math.random() * arrSpeechBubble.length)];
    }, 3000);
});