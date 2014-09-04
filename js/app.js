var app = angular.module('ichigo', ['ngRoute', 'ngCookies', 'ngAnimate']);

//
// Plugin actions (plugins add their events here)
//
var pluginActions = {
	onInitialize: [],
	onTrackBegin: [],
	onTrackEnd: [],
	onTrackPositionUpdate: [],
	onConfigure: [],
	onGetInfo: [],
}

//
// The playlist.
//
var playlist = {
	label: 'Default',
	tracks: []
};

//
// Loaded themes.
//
var themes = [];

//
// Currently selected track.
//
var currentTrack = -1;

//
// Are we playing?
//
var playing = false;

//
// Is the app busy?
//
var busy = false;

 //   ____             __ _       
 //  / ___|___  _ __  / _(_) __ _ 
 // | |   / _ \| '_ \| |_| |/ _` |
 // | |__| (_) | | | |  _| | (_| |
 //  \____\___/|_| |_|_| |_|\__, |
 //                         |___/ 
app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeCtrl',
		controllerAs: 'home'
	}).when('/settings', {
		templateUrl: 'views/settings.html',
		controller: 'SettingsCtrl',
		controllerAs: 'settings'
	});
});

app.directive('playlist', function () {
	return {
		restrict: 'A',
		templateUrl: 'views/directives/playlist.html'
	};
}).directive('library', function () {
	return {
		restrict: 'A',
		templateUrl: 'views/directives/library.html'
	};
}).directive('coverart', function () {
	return {
		restrict: 'A',
		templateUrl: 'views/directives/coverart.html'
	};
}).directive('selectionproperties', function () {
	return {
		restrict: 'A',
		templateUrl: 'views/directives/selectionproperties.html'
	};
}).directive('equalizer', function () {
	return {
		restrict: 'AE',
		templateUrl: 'views/directives/equalizer.html'
	};
}).directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});