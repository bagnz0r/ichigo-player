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
	},
	showLoadingDialog: function () {
		$('#loading-dialog').dialog({
			width: 400,
			height: 250,
			modal: true,
			resizable: false,
			draggable: false
		});
	},
	closeLoadingDialog: function () {
		$('#loading-dialog').dialog('close');
	},
	parseTags: function (path) {
		var tags = {
			'title': ichigoAudio.ig_read_tag_from_file(path, '%UTF8(%TRM(%TITL))'),
			'artist': ichigoAudio.ig_read_tag_from_file(path, '%UTF8(%TRM(%ARTI))'),
			'album': ichigoAudio.ig_read_tag_from_file(path, '%UTF8(%TRM(%ALBM))'),
			'genre': ichigoAudio.ig_read_tag_from_file(path, '%UTF8(%TRM(%GNRE))'),
			'year': ichigoAudio.ig_read_tag_from_file(path, '%UTF8(%TRM(%YEAR))'),
			'comment': ichigoAudio.ig_read_tag_from_file(path, '%UTF8(%TRM(%CMNT))'),
			'track_number': ichigoAudio.ig_read_tag_from_file(path, '%UTF8(%TRM(%TRCK))'), // may include track/total
			'composer': ichigoAudio.ig_read_tag_from_file(path, '%UTF8(%TRM(%COMP))'),
			'copyright': ichigoAudio.ig_read_tag_from_file(path, '%UTF8(%TRM(%COPY))'),
			'subtitle': ichigoAudio.ig_read_tag_from_file(path, '%UTF8(%TRM(%SUBT))'),
			'album_artist': ichigoAudio.ig_read_tag_from_file(path, '%UTF8(%TRM(%AART))'),
			'disc_number': ichigoAudio.ig_read_tag_from_file(path, '%UTF8(%TRM(%DISC))') // may include disc/total
		};

		for (var key in tags) {
			if (tags[key] == '') {
				tags[key] = undefined;
			}

			tags[key] = unescape(tags[key]);
		}

		return tags;
	},
	addPluginAction: function(eventType, func) {
		pluginActions[eventType][pluginActions[eventType].length] = func;
	}
};