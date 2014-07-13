var playlistActions = {
	forward: function () {
		if (currentTrack.index >= playlist.tracks.length || !playing) {
			return false;
		}

		currentTrack = currentTrack + 1;
		playlistActions.playTrackAtCurrentIndex();

		return true;
	},
	back: function () {
		if (currentTrack.index == 0 || !playing) {
			return false;
		}

		currentTrack = currentTrack - 1;
		playlistActions.playTrackAtCurrentIndex();

		return true;
	},
	forwardRand: function () {
		if (!playing) {
			return false;
		}

		currentTrack = Math.floor(Math.random() * playlist.tracks.length);
		playlistActions.playTrackAtCurrentIndex();

		return true;
	},
	playSelectedTrack: function (playlist, index) {
		currentTrack = index;
		playlistActions.playTrackAtCurrentIndex();
	},
	play: function () {
		ichigoAudio.ig_play();
		playing = true;
	},
	pause: function () {
		ichigoAudio.ig_pause();
		playing = false;
	},
	stop: function () {
		ichigoAudio.ig_stop();
		playing = false;
	},
	playTrackAtCurrentIndex: function() {
		var path = playlist.tracks[currentTrack].file;

		ichigoAudio.ig_create_stream(path);
		ichigoAudio.ig_play();
		playing = true;

		// set title, because boobs?
		$('title').text('Ichigo - ' + path);
	}
};