var util = {
	choosen: false,

	//
	// Single file selection dialog
	//
	chooseFile: function(callback) {
		util.chosen = false;

		$('#file').removeAttr('nwdirectory'); // HACK!

		var chooser = document.querySelector('#file');
		chooser.addEventListener("change", function(evt) {
			if (this.value != '' && !util.chosen) {
				util.chosen = true;
				callback(this.value);
			}
		}, false);

		chooser.click();
	},

	//
	// Multiple file selection dialog
	//
	chooseMultipleFiles: function(callback) {
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

	//
	// Folder selection dialog
	//
	chooseFolder: function(callback) {
		util.chosen = false;

		$('#file').attr('nwdirectory', 'nwdirectory'); // HACK!

		var chooser = document.querySelector('#file');
		chooser.addEventListener("change", function(evt) {
			if (this.value != '' && !util.chosen) {
				util.chosen = true;
				callback(this.value);
			}
		}, false);

		chooser.click();
	},

	//
	// Shows loading dialog
	//
	showLoadingDialog: function() {
		busy = true;

		$('#loading-dialog').dialog({
			width: 560,
			height: 250,
			modal: true,
			resizable: false,
			draggable: false
		});
	},

	//
	// Sets loading dialog status text
	//
	setLoadingDialogStatus: function(status) {
		$('#loading-dialog-text').html(status);
	},

	//
	// Closes loading dialog
	//
	closeLoadingDialog: function() {
		busy = false;
		
		$('#loading-dialog').dialog('close');
	},

	//
	// Parses tags in a provided file
	//
	parseTags: function(path) {
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
			tags[key] = unescape(tags[key]);

			if (tags[key] == '' || tags[key] == null) {
				tags[key] = undefined;
			}

			if (tags[key] != undefined && tags[key].indexOf('/') > -1 && key == 'track_number') {
				tags[key] = parseInt(tags[key].substring(0, tags[key].indexOf('/')));
			}
		}

		return tags;
	},

	//
	// Scans folder for compatible files and adds them to media library
	//
	mediaLibraryScanFolder: function() {
		util.getCompatibleFilesInFolder(function(files) {
			util.showLoadingDialog();
			util.setLoadingDialogStatus('Parsing tags...');

			if (files.length == 0) {
				util.closeLoadingDialog(); return;
			}

			var i = -1;
			var next = function() {
				i++;
				var file = files[i];
				var tags = util.parseTags(file);

				util.setLoadingDialogStatus('Parsing tags (' + Math.round(((i + 1) / files.length) * 100) + '%)...');
				mediaLibrary.addTrack(
					tags.album == undefined ? 'Unknown' : tags.album,
					tags.album_artist == undefined ? (tags.artist == undefined ? 'Unknown' : tags.artist) : tags.album_artist,
					tags.album_artist == undefined ? undefined : tags.artist,
					tags.title == undefined ? 'Unknown' : tags.title,
					tags.track_number == undefined ? 0 : tags.track_number,
					file,
					function(success) {
						if (i >= (files.length - 1)) {
							util.setLoadingDialogStatus('Please wait...');
							util.closeLoadingDialog();
						} else {
							setTimeout(next, 50);
						}
					}
				);
			}
			
			next();
		});
	},

	//
	// Looks for compatible files in a folder and returns a list in a callback
	//
	getCompatibleFilesInFolder: function(callback) {
		util.chooseFolder(function(folder) {
			util.showLoadingDialog();
			util.setLoadingDialogStatus('Looking for files...');

			var walk = require('walk');
			var files = [];

			var walker = walk.walk(folder, { followLinks: false});
			walker.on('file', function(root, stat, next) {
				util.setLoadingDialogStatus('Looking for files (' + files.length + ')...');
				var fileNameLower = stat.name.toLowerCase();
				if (fileNameLower.indexOf('.mp3') > -1 || fileNameLower.indexOf('.ogg') > -1 || fileNameLower.indexOf('.m4a') > -1 || fileNameLower.indexOf('.mp4') > -1
					|| fileNameLower.indexOf('.mpc') > -1 || fileNameLower.indexOf('.wav') > -1 || fileNameLower.indexOf('.flac') > -1 || fileNameLower.indexOf('.wv') > -1) {
					files.push(root + '/' + stat.name);
				}

				next();
			});

			walker.on('end', function() {
				callback(files);
			});
		});
	},

	//
	// Creates a list of plugin files.
	//
	getPluginFiles: function(callback) {
		var walk = require('walk');
		var files = [];

		var walker = walk.walk('plugins', { followLinks: false});
		walker.on('file', function(root, stat, next) {
			var fileNameLower = stat.name.toLowerCase();
			if (fileNameLower == 'ichigo-plugin.js') {
				files.push(root + '/' + stat.name);
			}

			next();
		});

		walker.on('end', function() {
			callback(files);
		});
	}
};