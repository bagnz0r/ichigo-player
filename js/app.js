var app = angular.module('ichigo', ['ngRoute', 'ngCookies', 'ngAnimate']);

var pluginActions = {
	onTrackBegin: [],
	onTrackEnd: [],
	onTrackPositionUpdate: [],
}

var playlist = {
	label: 'Default',
	tracks: []
};
var currentTrack = -1;
var playing = false;

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
	}).when('/about', {
		templateUrl: 'views/about.html',
		controller: 'AboutCtrl',
		controllerAs: 'about'
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
});


 //  ____       _                          _           _               
 // / ___|  ___| |_ _   _ _ __   __      _(_)_ __   __| | _____      __
 // \___ \ / _ \ __| | | | '_ \  \ \ /\ / / | '_ \ / _` |/ _ \ \ /\ / /
 //  ___) |  __/ |_| |_| | |_) |  \ V  V /| | | | | (_| | (_) \ V  V / 
 // |____/ \___|\__|\__,_| .__/    \_/\_/ |_|_| |_|\__,_|\___/ \_/\_/  
 //                      |_|                                           

var gui = require('nw.gui');
var win = gui.Window.get();
var menubar = new gui.Menu({ type: 'menubar' });


 //  __  __                  _                             _   _                 
 // |  \/  | ___ _ __  _   _| |__   __ _ _ __    __ _  ___| |_(_) ___  _ __  ___ 
 // | |\/| |/ _ \ '_ \| | | | '_ \ / _` | '__|  / _` |/ __| __| |/ _ \| '_ \/ __|
 // | |  | |  __/ | | | |_| | |_) | (_| | |    | (_| | (__| |_| | (_) | | | \__ \
 // |_|  |_|\___|_| |_|\__,_|_.__/ \__,_|_|     \__,_|\___|\__|_|\___/|_| |_|___/
                                                                              
var fileMenu = new gui.Menu();
var viewMenu = new gui.Menu();
var playbackMenu = new gui.Menu();
var libraryMenu = new gui.Menu();
var helpMenu = new gui.Menu();

menubar.append(
new gui.MenuItem({
		label: 'File',
		submenu: fileMenu
	}
)); menubar.append(
new gui.MenuItem({
		label: 'View',
		submenu: viewMenu
	}
)); menubar.append(
new gui.MenuItem({
		label: 'Playback',
		submenu: playbackMenu
	}
)); menubar.append(
new gui.MenuItem({
		label: 'Help',
		submenu: helpMenu
	}
));


 //  _____ _ _                                   
 // |  ___(_) | ___   _ __ ___   ___ _ __  _   _ 
 // | |_  | | |/ _ \ | '_ ` _ \ / _ \ '_ \| | | |
 // |  _| | | |  __/ | | | | | |  __/ | | | |_| |
 // |_|   |_|_|\___| |_| |_| |_|\___|_| |_|\__,_|
                                              
fileMenu.append(new gui.MenuItem({
		label: 'Open...',
		click: function() {
			util.chooseFile(function(path) {
				playlistActions.stop();
				playlistActions.clear();
				playlistActions.fillPlaylist(file);
			});
		}
	}
));
fileMenu.append(new gui.MenuItem({ type: 'separator' }));
fileMenu.append(new gui.MenuItem({
		label: 'Add files...',
		click: function() {
			util.chooseMultipleFiles(function(files) {
				playlistActions.fillPlaylist(files);
			});
		}
	}
));
fileMenu.append(new gui.MenuItem({
		label: 'Add folder...',
		click: function() {
		}
	}
));
fileMenu.append(new gui.MenuItem({ type: 'separator' }));
fileMenu.append(new gui.MenuItem({
		label: 'New playlist...',
		click: function() {
			playlistActions.stop();
			playlistActions.clear();
		}
	}
));
fileMenu.append(new gui.MenuItem({
		label: 'Open playlist...',
		click: function() {
			playlistActions.stop();
			playlistActions.clear();
			playlistActions.createFromFile();
		}
	}
));
fileMenu.append(new gui.MenuItem({
		label: 'Save playlist...',
		click: function() {
		}
	}
));
fileMenu.append(new gui.MenuItem({ type: 'separator' }));
fileMenu.append(new gui.MenuItem({
		label: 'Settings',
		click: function() {
		}
	}
));
fileMenu.append(new gui.MenuItem({ type: 'separator' }));
fileMenu.append(new gui.MenuItem({
		label: 'Last.fm authenticate (!! TEMPORARY OPTION !!)',
		click: function() {
			alert('Authentication will only occur if you haven\'t authd already btw.');
			lastfm_Authenticate(window.prompt('Enter username'));
		}
	}
));
fileMenu.append(new gui.MenuItem({ type: 'separator' }));
fileMenu.append(new gui.MenuItem({
		label: 'Exit',
		click: function() {
		}
	}
));


 // __     ___                                            
 // \ \   / (_) _____      __  _ __ ___   ___ _ __  _   _ 
 //  \ \ / /| |/ _ \ \ /\ / / | '_ ` _ \ / _ \ '_ \| | | |
 //   \ V / | |  __/\ V  V /  | | | | | |  __/ | | | |_| |
 //    \_/  |_|\___| \_/\_/   |_| |_| |_|\___|_| |_|\__,_|
 
viewMenu.append(new gui.MenuItem({
		label: 'Equalizer',
		click: function() {
		}
	}
));
viewMenu.append(new gui.MenuItem({
		label: 'Visualizations',
		click: function() {
		}
	}
));


 //  ____  _             _                _                                 
 // |  _ \| | __ _ _   _| |__   __ _  ___| | __  _ __ ___   ___ _ __  _   _ 
 // | |_) | |/ _` | | | | '_ \ / _` |/ __| |/ / | '_ ` _ \ / _ \ '_ \| | | |
 // |  __/| | (_| | |_| | |_) | (_| | (__|   <  | | | | | |  __/ | | | |_| |
 // |_|   |_|\__,_|\__, |_.__/ \__,_|\___|_|\_\ |_| |_| |_|\___|_| |_|\__,_|
 //                |___/                                                    

playbackMenu.append(new gui.MenuItem({
		label: 'Stop',
		click: function() {
			playlistActions.stop();
		}
	}
));
playbackMenu.append(new gui.MenuItem({
		label: 'Play',
		click: function() {
			playlistActions.play();
		}
	}
));
playbackMenu.append(new gui.MenuItem({
		label: 'Pause',
		click: function() {
			playlistActions.pause();
		}
	}
));
playbackMenu.append(new gui.MenuItem({ type: 'separator' }));
playbackMenu.append(new gui.MenuItem({
		label: 'Previous',
		click: function() {
			playlistActions.back();
		}
	}
));
playbackMenu.append(new gui.MenuItem({
		label: 'Next',
		click: function() {
			playlistActions.forward();
		}
	}
));
playbackMenu.append(new gui.MenuItem({
		label: 'Random',
		click: function() {
			playlistActions.forwardRand();
		}
	}
));


 //  _   _      _                                    
 // | | | | ___| |_ __    _ __ ___   ___ _ __  _   _ 
 // | |_| |/ _ \ | '_ \  | '_ ` _ \ / _ \ '_ \| | | |
 // |  _  |  __/ | |_) | | | | | | |  __/ | | | |_| |
 // |_| |_|\___|_| .__/  |_| |_| |_|\___|_| |_|\__,_|
 //              |_|                                 

helpMenu.append(new gui.MenuItem({
		label: 'About Ichigo...',
		click: function() {
			$('#about-dialog').dialog({
				width: 400,
				height: 450,
				modal: true,
				resizable: false,
				draggable: false
			});

			$('#about-dialog button').click(function() {
				$('#about-dialog').dialog('close');
			});
		}
	}
));

win.menu = menubar;


 //   ____            _             _ _               
 //  / ___|___  _ __ | |_ _ __ ___ | | | ___ _ __ ___ 
 // | |   / _ \| '_ \| __| '__/ _ \| | |/ _ \ '__/ __|
 // | |__| (_) | | | | |_| | | (_) | | |  __/ |  \__ \
 //  \____\___/|_| |_|\__|_|  \___/|_|_|\___|_|  |___/
                                                   
app.controller('HomeCtrl', function ($scope) {
	// do some shit? i don't know...
});

app.controller('PlaybackCtrl', function ($scope, $timeout) {
	// Prepare position scroll element.
	var scrollElement = $('#track-scroll-element');
	scrollElement.slider();
	scrollElement.slider('option', 'max', 0);
	scrollElement.slider('value', 0);
	scrollElement.slider('option', 'disabled', true);

	// Prepare volume scroll element.
	var volumeScrollElement = $('#volume-control');
	volumeScrollElement.slider();
	volumeScrollElement.slider('option', 'max', 100);
	volumeScrollElement.slider('value', 100);
	volumeScrollElement.slider({
		slide: function (event, ui) {
			ichigoAudio.ig_set_volume(ui.value/100);
		}
	});

	// Set some defaults.
	$scope.trackPos = '00:00';
	$scope.trackLength = '00:00';

	// Bind playback actions.
	$scope.play = function() {
		playlistActions.play();
	};
	$scope.pause = function() {
		playlistActions.pause();
	};
	$scope.stop = function() {
		playlistActions.stop();
	};
	$scope.forward = function() {
		playlistActions.forward();
	};
	$scope.back = function() {
		playlistActions.back();
	};
	$scope.forwardRand = function() {
		playlistActions.forwardRand();
	};

	// Add position slider event.
	scrollElement.slider({
		slide: function (event, ui) {
			if (ichigoAudio.ig_is_stream_active() && !ichigoAudio.ig_is_paused()) {
				ichigoAudio.ig_set_pos(ui.value);
			}
		}
	});

	// Set track position update.
	setInterval(function() {
		if (ichigoAudio.ig_is_stream_active()) {
			scrollElement.slider('option', 'disabled', false);

			$scope.$apply(function() {
				var pos = Math.round(ichigoAudio.ig_get_pos());
				var len = Math.round(ichigoAudio.ig_get_len());

				$scope.trackPos = new Date(null, null, null, 0, 0, pos);
				$scope.trackLength = new Date(null, null, null, 0, 0, len);
				
				scrollElement.slider('option', 'max', len);
				scrollElement.slider('value', pos);

				// execute plugin actions
				for (var i in pluginActions.onTrackPositionUpdate) {
					pluginActions.onTrackPositionUpdate[i](pos, len);
				}
			});
		}
		else
		{
			// Try to skip the track.
			if (playing) {
				if (!playlistActions.forward()) {
					playlistActions.stop();
				}
			}
			else
			{
				// Continue otherwise.
				scrollElement.slider('option', 'disabled', true);
				if ($('title').text() != 'Ichigo') {
					$('title').text('Ichigo');
				}

				$scope.$apply(function() {
					$scope.trackPos = '00:00';
					$scope.trackLength = '00:00';

					scrollElement.slider('option', 'max', 0);
					scrollElement.slider('value', 0);
				});
			}
		}
	}, 100);
});

app.controller('PlaylistCtrl', function ($scope) {
	setInterval(function() {
		$scope.$apply(function() {
			$scope.tracks = playlist.tracks;
			$scope.currentTrack = currentTrack;
			$scope.active = ichigoAudio.ig_is_stream_active();
		});
	}, 100);

	$scope.setTrack = function (index) {
		playlistActions.playSelectedTrack(index);
	};
});