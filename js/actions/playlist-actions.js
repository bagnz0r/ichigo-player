var playlistActions = {

	//
	// Skip forward to the next track
	//
	forward: function() {
		if (currentTrack >= (playlist.tracks.length - 1) || !playing) {
			return false;
		}

		// execute plugin actions
		for (var i in pluginActions.onTrackEnd) {
			pluginActions.onTrackEnd[i](playlist.tracks[currentTrack]);
		}

		currentTrack = currentTrack + 1;
		playlistActions.playTrackAtCurrentIndex();

		return true;
	},

	//
	// Skip backwards to the previous track
	//
	back: function() {
		if (currentTrack == 0 || !playing) {
			return false;
		}

		// execute plugin actions
		for (var i in pluginActions.onTrackEnd) {
			pluginActions.onTrackEnd[i](playlist.tracks[currentTrack]);
		}

		currentTrack = currentTrack - 1;
		playlistActions.playTrackAtCurrentIndex();

		return true;
	},

	//
	// Randomly jump to a track
	//
	forwardRand: function() {
		if (!playing) {
			return false;
		}

		// execute plugin actions
		for (var i in pluginActions.onTrackEnd) {
			pluginActions.onTrackEnd[i](playlist.tracks[currentTrack]);
		}

		currentTrack = Math.floor(Math.random() * playlist.tracks.length);
		playlistActions.playTrackAtCurrentIndex();

		return true;
	},

	//
	// Play track at provided index
	//
	playSelectedTrack: function(index) {
		currentTrack = index;
		playlistActions.playTrackAtCurrentIndex();

		return true;
	},

	//
	// Remove track at provided index
	//
	removeSelectedTrack: function(index) {
		if (currentTrack == index) {
			playlistActions.stop();
		}
		playlist.tracks.splice(index, 1);

		return true;
	},

	//
	// Play/resume currently paused/prepared track
	//
	play: function() {
		if (currentTrack != -1) {
			ichigoAudio.ig_play();
			playing = true;

			return true;
		}

		return false;
	},

	//
	// Pause the currently playing track
	//
	pause: function() {
		if (currentTrack != -1) {
			ichigoAudio.ig_pause();
			playing = false;

			return true;
		}

		return false;
	},

	//
	// Stops the currently playing track
	//
	stop: function() {
		if (playing) {
			// execute plugin actions
			for (var i in pluginActions.onTrackEnd) {
				pluginActions.onTrackEnd[i]();
			}
		}
		
		ichigoAudio.ig_stop();
		currentTrack = -1;
		playing = false;

		return true;
	},

	//
	// Plays a track currently selected index
	//
	playTrackAtCurrentIndex: function() {
		var path = playlist.tracks[currentTrack].file;

		console.log(ichigoAudio.ig_create_stream(path));
		ichigoAudio.ig_play();
		playing = true;

		// set title, because boobs?
		var trackInfo = '';
		if (playlist.tracks[currentTrack].tags.artist != undefined && playlist.tracks[currentTrack].tags.title != undefined) {
			trackInfo = playlist.tracks[currentTrack].tags.artist;

			if (playlist.tracks[currentTrack].tags.album != undefined) {
				trackInfo += ' [' + playlist.tracks[currentTrack].tags.album;

				if (playlist.tracks[currentTrack].tags.track_number != undefined) {
					trackInfo += ' ' + playlist.tracks[currentTrack].tags.track_number;
				}

				trackInfo += ']';
			}

			trackInfo += ' - ' + playlist.tracks[currentTrack].tags.title;
		}

		$('title').text('Ichigo - ' + trackInfo);

		// execute plugin actions
		for (var i in pluginActions.onTrackBegin) {
			pluginActions.onTrackBegin[i](playlist.tracks[currentTrack]);
		}

		return true;
	},

	//
	// Fill playlist with files (provide an array)
	//
	fillPlaylist: function(files) {
		util.showLoadingDialog();

		setTimeout(function() {
			var count = 0;
			for (var i in files) {
				if (typeof files[i] === 'object') {
					var path = files[i].path.trim();
					var tags = util.parseTags(path);

					playlist.tracks[playlist.tracks.length] = {
						'file': path,
						'tags': tags,
						'libraryId': files[i].libraryId,
						'listened': files[i].listened
					};

					count++;

					if (count == files.length) {
						util.closeLoadingDialog();
					}
				} else {
					var path = files[i].trim();
					var tags = util.parseTags(path);

					playlist.tracks[playlist.tracks.length] = {
						'file': path,
						'tags': tags
					};

					count++;

					if (count == files.length) {
						util.closeLoadingDialog();
					}
				}
			}
		}, 500);
	},

	//
	// Clears the playlist
	//
	clear: function($scope) {
		playlistActions.stop();
		
		playlist = {
			label: 'Default',
			tracks: []
		};

		return true;
	},

	//
	// Creates playlist contents from file
	//
	createFromFile: function() {
		util.chooseFile(function (path) {
			var extension = path.split('.').pop().toLowerCase();
			switch (extension) {
				case 'm3u':
					playlistActions.createFromM3U(path);
				break;
				case 'm3u8':
					playlistActions.createFromM3U(path);
				break;
				case 'cue':
					playlistActions.createFromCUE(path);
				break;
			}
		});
	},

	//
	// Create playlist from M3U.
	//
	createFromM3U: function(path) {
		var fs = require('fs');
		fs.readFile(path, 'utf8', function (error, data) {
			if (error) {
				return console.log(error);
			}

			var entries = data.replace(/\r/, '').split(/\n/);
			entries.pop();

			playlistActions.fillPlaylist(entries);
		});
	},

	//
	// Save playlist to file (M3U).
	//
	saveToFile: function() {
		if (playlist.tracks.length < 1) return;

		util.saveFile(function (path) {
			var fs = require('fs');
			var output = '';
			for (var index in playlist.tracks) {
				output += playlist.tracks[index].file + "\r\n";
			}

			fs.writeFile(path, output, function (err) {
				if (err) {
					util.showOsdCallout('Something went wrong', 'We could not save the playlist.\nPerhaps you don\'t have permissions to write\nto this location specifically?');
				}
			});
		});
	},
};