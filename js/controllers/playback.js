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
				if (playlist.tracks[currentTrack].libraryId) {
					playlist.tracks[currentTrack].listened = true;
					mediaLibrary.setTrackListened(playlist.tracks[currentTrack].libraryId, function(result) {
						console.log('Library: Track listen status update: ' + result);
					});
				}

				if (!playlistActions.forward()) {
					playlistActions.stop();
				}
			}
			else
			{
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