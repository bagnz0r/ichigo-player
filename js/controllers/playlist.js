app.controller('PlaylistCtrl', function($scope) {
	// height hack
	var heightHack = function() { $('div.playlist').css('height', $('body').height() - 78); };
	heightHack();
	$(window).resize(function() {
		heightHack();
	});

	// Track update timer.
	// TODO: This is too hacky...
	setInterval(function() {
		$scope.$apply(function() {
			$scope.tracks = playlist.tracks;
			$scope.currentTrack = currentTrack;
			$scope.active = ichigoAudio.ig_is_stream_active();
		});
	}, 100);

	// Set track in playlist.
	$scope.trackIndex = -1;
	$scope.setTrack = function(index) {
		playlistActions.playSelectedTrack(index);
	};

	// This menu will pop up when the user right-clicks on a track
	var trackMenu = new gui.Menu();
	trackMenu.append(new gui.MenuItem({
			label: 'Play',
			click: function() {
				playlistActions.playSelectedTrack($scope.trackIndex);
			}
		}
	));
	trackMenu.append(new gui.MenuItem({
			label: 'Remove',
			click: function() {
				playlistActions.removeSelectedTrack($scope.trackIndex);
			}
		}
	));
	trackMenu.append(new gui.MenuItem({ type: 'separator' }));
	trackMenu.append(new gui.MenuItem({
			label: 'Properties',
			click: function() {
				// TODO: Open properties window here
			}
		}
	));

	// This scope function will spawn the track menu on right click.
	$scope.spawnTrackMenu = function(event, index) {
		$scope.trackIndex = index;
		trackMenu.popup(event.x, event.y);
	};
});