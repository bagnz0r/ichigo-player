var util = {
	choosen: false,
	chooseFile: function (callback) {
		util.chosen = false;

		var chooser = document.querySelector('#file');
		chooser.addEventListener("change", function(evt) {
			if (this.value != '' && !util.chosen) {
				util.chosen = true;
				callback(this.value);
			}
		}, false);

		chooser.click();
	},
	chooseMultipleFiles: function (callback) {
		util.chosen = false;

		var chooser = document.querySelector('#file-multiple');
		chooser.addEventListener("change", function(evt) {
			if (this.value != '' && !util.chosen) {
				util.chosen = true;
				callback(this.value.split(';'));
			}
		}, false);

		chooser.click();
	}
};

var playlistActions = {
	forward: function () {
		if (currentTrack.index >= playlists[selectedPlaylist].tracks.length || !playing) {
			return false;
		}

		currentTrack = {
			'playlist': selectedPlaylist,
			'index': (currentTrack.index + 1)
		};

		var path = playlists[currentTrack.playlist].tracks[currentTrack.index];

		ichigoAudio.ig_create_stream(path);
		ichigoAudio.ig_play();
		playing = true;

		// set title, because boobs?
		$('title').text('Ichigo - ' + path);

		return true;
	},
	back: function () {
		if (currentTrack.index == 0 || !playing) {
			return false;
		}

		currentTrack = {
			'playlist': selectedPlaylist,
			'index': (currentTrack.index - 1)
		};

		var path = playlists[currentTrack.playlist].tracks[currentTrack.index];

		ichigoAudio.ig_create_stream(path);
		ichigoAudio.ig_play();
		playing = true;

		// set title, because boobs?
		$('title').text('Ichigo - ' + path);

		return true;
	},
	playSelectedTrack: function (playlist, index) {
		currentTrack = {
			'playlist': playlist,
			'index': index
		};

		var path = playlists[currentTrack.playlist].tracks[currentTrack.index];

		ichigoAudio.ig_create_stream(path);
		ichigoAudio.ig_play();
		playing = true;

		// set title, because boobs?
		$('title').text('Ichigo - ' + path);
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
	}
};