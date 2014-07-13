var playlistActions = {

	/**
	 * Skip forward to the next track
	 */
	forward: function () {
		if (currentTrack.index >= playlist.tracks.length || !playing) {
			return false;
		}

		currentTrack = currentTrack + 1;
		playlistActions.playTrackAtCurrentIndex();

		return true;
	},

	/**
	 * Skip backwards to the previous track
	 */
	back: function () {
		if (currentTrack.index == 0 || !playing) {
			return false;
		}

		currentTrack = currentTrack - 1;
		playlistActions.playTrackAtCurrentIndex();

		return true;
	},

	/**
	 * Randomly jump to a track
	 */
	forwardRand: function () {
		if (!playing) {
			return false;
		}

		currentTrack = Math.floor(Math.random() * playlist.tracks.length);
		playlistActions.playTrackAtCurrentIndex();

		return true;
	},

	/**
	 * Play track at provided index
	 */
	playSelectedTrack: function (index) {
		currentTrack = index;
		playlistActions.playTrackAtCurrentIndex();
	},

	/**
	 * Play/resume currently paused/prepared track
	 */
	play: function () {
		ichigoAudio.ig_play();
		playing = true;
	},

	/**
	 * Pause the currently playing track
	 */
	pause: function () {
		ichigoAudio.ig_pause();
		playing = false;
	},

	/**
	 * Stops the currently playing track
	 */
	stop: function () {
		ichigoAudio.ig_stop();
		currentTrack = -1;
		playing = false;
	},

	/**
	 * Plays a track currently selected index
	 */
	playTrackAtCurrentIndex: function () {
		var path = playlist.tracks[currentTrack].file;

		ichigoAudio.ig_create_stream(path);
		ichigoAudio.ig_play();
		playing = true;

		// set title, because boobs?
		$('title').text('Ichigo - ' + path);
	},

	/**
	 * Fill playlist with files (provide an array)
	 */
	fillPlaylist: function (files) {
		for (var i in files) {
			playlist.tracks[playlist.tracks.length] = {
				'file': files[i].trim(),
				'tags': {}
			};

			// TODO: Parse tags here?
		}
	},

	/**
	 * Clears the playlist
	 */
	clear: function ($scope) {
		playlist = {
			label: 'Default',
			tracks: []
		};
	},

	/**
	 * Creates playlist contents from file
	 */
	createFromFile: function () {
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

	/**
	 * Create playlist from M3U.
	 */
	createFromM3U: function (path) {
		var fs = require('fs');
		fs.readFile(path, 'utf8', function (error, data) {
			if (error) {
				return console.log(error);
			}

			var entries = data.replace(/\r/, '').split(/\n/);
			entries.pop();

			playlistActions.fillPlaylist(entries);
		});
	}
};