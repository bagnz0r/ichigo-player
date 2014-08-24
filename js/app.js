var app = angular.module('ichigo', ['ngRoute', 'ngCookies', 'ngAnimate']);

var pluginActions = {
	onInitialize: [],
	onTrackBegin: [],
	onTrackEnd: [],
	onTrackPositionUpdate: [],
	onConfigure: [],
	onGetInfo: [],
}

var playlist = {
	label: 'Default',
	tracks: []
};

var currentTrack = -1;
var playing = false;
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
		label: 'Open',
		click: function() {
			if (busy) return;

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
		label: 'Add files',
		click: function() {
			if (busy) return;

			util.chooseMultipleFiles(function(files) {
				playlistActions.fillPlaylist(files);
			});
		}
	}
));
fileMenu.append(new gui.MenuItem({
		label: 'Add folder',
		click: function() {
			if (busy) return;

			util.getCompatibleFilesInFolder(function(files) {
				playlistActions.fillPlaylist(files);
				util.closeLoadingDialog();
			});
		}
	}
));
fileMenu.append(new gui.MenuItem({ type: 'separator' }));
fileMenu.append(new gui.MenuItem({
		label: 'New playlist',
		click: function() {
			if (busy) return;

			playlistActions.stop();
			playlistActions.clear();
		}
	}
));
fileMenu.append(new gui.MenuItem({
		label: 'Open playlist',
		click: function() {
			if (busy) return;

			playlistActions.stop();
			playlistActions.clear();
			playlistActions.createFromFile();
		}
	}
));
fileMenu.append(new gui.MenuItem({
		label: 'Save playlist',
		click: function() {
			if (busy) return;
		}
	}
));
fileMenu.append(new gui.MenuItem({ type: 'separator' }));
fileMenu.append(new gui.MenuItem({
		label: 'Settings',
		click: function() {
			if (busy) return;
			document.location = '#/settings';
		}
	}
));
fileMenu.append(new gui.MenuItem({ type: 'separator' }));
fileMenu.append(new gui.MenuItem({
		label: 'Exit',
		click: function() {
			if (busy) return;
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
			if (busy) return;

			$('#equalizer-dialog').dialog({
				width: 850,
				height: 180,
				modal: true,
				resizable: false,
				draggable: false
			});

			$('#equalizer-dialog button').click(function() {
				$('#equalizer-dialog').dialog('close');
			});
		}
	}
));
viewMenu.append(new gui.MenuItem({
		label: 'Visualizations',
		click: function() {
			if (busy) return;
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
			if (busy) return;

			playlistActions.stop();
		}
	}
));
playbackMenu.append(new gui.MenuItem({
		label: 'Play',
		click: function() {
			if (busy) return;

			playlistActions.play();
		}
	}
));
playbackMenu.append(new gui.MenuItem({
		label: 'Pause',
		click: function() {
			if (busy) return;

			playlistActions.pause();
		}
	}
));
playbackMenu.append(new gui.MenuItem({ type: 'separator' }));
playbackMenu.append(new gui.MenuItem({
		label: 'Previous',
		click: function() {
			if (busy) return;

			playlistActions.back();
		}
	}
));
playbackMenu.append(new gui.MenuItem({
		label: 'Next',
		click: function() {
			if (busy) return;

			playlistActions.forward();
		}
	}
));
playbackMenu.append(new gui.MenuItem({
		label: 'Random',
		click: function() {
			if (busy) return;

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
		label: 'About Ichigo',
		click: function() {
			if (busy) return;
			
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
                                                   
var initialized = false;
app.controller('HomeCtrl', function($scope) {
	if (!initialized) {

		// Show "alpha dialog"
		$('#alpha-dialog').dialog({
			width: 500,
			height: 200,
			modal: true,
			resizable: false,
			draggable: false
		});
		$('#alpha-dialog button').click(function() {
			$('#alpha-dialog').dialog('close');
		});

		// Initialize media library.
		mediaLibrary.initialize();

		// Initialize plugins.
		util.getPluginFiles(function(files) {
			for (var i = 0; i < files.length; i++) {
				console.log('Loading plugin ' + files[i]);
				plugin.loadPluginAsset(files[i], 'js');

				if (i >= (files.length - 1)) {
					setTimeout(function() {
						for (var key in pluginActions.onInitialize) {
							pluginActions.onInitialize[key]();
						}
					}, 3000);
				}
			}
		});

	}

	initialized = true;
});

app.controller('EqualizerCtrl', function ($scope) {
	ichigoAudio.ig_enable_equalizer();

	var bands = [];
	for (var i = 1; i <= 18; i++) {
		bands[i] = $('#eq-band' + i);
		bands[i].slider({
			min: -1500,
			max: 1500,
			value: 0,
			orientation: 'vertical',
			slide: function (event, ui) {
				var freq = $(this).attr('data-frequency');
				var id = $(this).attr('data-id');
				var gain = ui.value/100;

				ichigoAudio.ig_set_equalizer(parseInt(id), 1, parseFloat(freq), gain);

				console.log('Equalizer: ' + freq + ' hZ @ ' + gain + ' db');
			}
		});

		bands[i].attr('data-id', i);
	}
});

app.controller('PlaybackCtrl', function ($scope, $timeout) {
	// Prepare position scroll element.
	var scrollElement = $('#track-scroll-element');
	scrollElement.slider({
		value: 0,
		max: 0,
		disabled: true
	});

	// Prepare volume scroll element.
	var volumeScrollElement = $('#volume-control');
	volumeScrollElement.slider({
		max: 100,
		value: 100,
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

app.controller('PlaylistCtrl', function($scope) {
	// height hack
	var heightHack = function() { $('div.playlist').css('height', $('body').height() - 78); };
	heightHack();
	$(window).resize(function() {
		heightHack();
	});

	setInterval(function() {
		$scope.$apply(function() {
			$scope.tracks = playlist.tracks;
			$scope.currentTrack = currentTrack;
			$scope.active = ichigoAudio.ig_is_stream_active();
		});
	}, 100);

	$scope.setTrack = function(index) {
		playlistActions.playSelectedTrack(index);
	};
});

app.controller('LibraryCtrl', function($scope) {
	// height hack
	var heightHack = function() { $('aside.library').css('height', $('body').height() - 78); };
	heightHack();
	$(window).resize(function() {
		heightHack();
	});

	$scope.selectedTrackList = -1;
	$scope.selectedTrack = -1;

	// This menu will pop up when the user right-clicks on an album
	var albumMenu = new gui.Menu();
	albumMenu.append(new gui.MenuItem({
			label: 'Send to playlist',
			click: function() {
				if ($scope.selectedTrackList) {
					var files = [];
					for (var i = 0; i < $scope.selectedTrackList.length; i++) {
						files[i] = $scope.selectedTrackList[i].path;

						if (i >= ($scope.selectedTrackList.length - 1)) {
							playlistActions.fillPlaylist(files);
						}
					}
				}
			}
		}
	));

	// This menu will pop up when the user right-clicks on a track
	var trackMenu = new gui.Menu();
	trackMenu.append(new gui.MenuItem({
			label: 'Send to playlist',
			click: function() {
				playlistActions.fillPlaylist([$scope.selectedTrack]);
			}
		}
	));

	// This function will be called when artist object is collapsed
	var setAlbums = function(artist) {
		mediaLibrary.getAlbums(artist.id, function(albums) {
			artist.albums = albums;
		});
	};

	// This scope function will set tracks for a specific album.
	$scope.setTracks = function(album) {
		if (album.tracks != undefined) return;

		mediaLibrary.getTracks(album.id, function(tracks) {
			console.log('Library: Getting tracks for ' + album.id);

			album.tracks = tracks;
		});
	};

	// This scope function will spawn the album menu on right click.
	$scope.spawnAlbumMenu = function(event, tracks) {
		$scope.selectedTrackList = tracks;
		albumMenu.popup(event.x, event.y);
	};

	// This scope function will spawn the track menu on right click.
	$scope.spawnTrackMenu = function(event, path) {
		$scope.selectedTrack = path;
		trackMenu.popup(event.x, event.y);
	};

	// Album search filter.
	$scope.searchInput = '';
	$scope.searchFilter = function(obj) {
		return $scope.searchInput != '' ? obj.name.match($scope.searchInput) : true;
	}


	mediaLibrary.getArtists(function(result) {
		$scope.artists = result ? result : [];
		for (var i = 0; i < $scope.artists.length; i++) {
			setAlbums($scope.artists[i]);
		}
	});
});

app.controller('SettingsCtrl', function ($scope) {
	$('#settings-tabs').tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
	$('#tabs li').removeClass('ui-corner-top').addClass('ui-corner-left');

	$scope.addMediaToLibrary = function() {
		util.mediaLibraryScanFolder();
	};

	$scope.clearLibrary = function() {
		mediaLibrary.emptyLibrary();
	};
});

app.controller('PluginsCtrl', function ($scope) {
	var plugins = [];
	for (index in pluginActions.onGetInfo) {
		plugins[index] = pluginActions.onGetInfo[index]();
	}

	$scope.plugins = plugins;
	$scope.currentPlugin = -1;
	$scope.isEnabled = false;

	$scope.togglePlugin = function () {
		plugin.togglePlugin(plugins[$scope.currentPlugin].scope);
		$scope.isEnabled = plugin.isPluginEnabled(plugins[$scope.currentPlugin].scope);
	};

	$scope.configurePlugin = function () {
		pluginActions.onConfigure[index]();
	}

	$scope.setPlugin = function (index) {
		$scope.currentPlugin = index;
		$scope.isEnabled = plugin.isPluginEnabled(plugins[$scope.currentPlugin].scope);
	};
});