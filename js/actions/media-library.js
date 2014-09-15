var mediaLibrary = {
	database: 0,

	initialize: function() {
		this.database = openDatabase('ichigo-audio', '1.0', 'Ichigo media library', 32 * 1024 * 1024);
		this.database.transaction(function(tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS artists (id integer primary key autoincrement, name)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS albums (id integer primary key autoincrement, artist_id int, artist, title)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS tracks (id integer primary key autoincrement, album_id int, track_number int, artist, title, path, listened int)');
		});
	},

	addTrack: function(album, artist, contributingArtist, title, trackNumber, path, callback) {
		var insertAlbumData = function(artistId, tx) {
			// Look for the album.
			tx.executeSql('SELECT * FROM albums WHERE title = ? AND artist = ?', [album, artist], function(tx, results) {
				// If none was found, add a new row.
				if (results.rows.length == 0) {
					tx.executeSql('INSERT INTO albums(\'artist_id\', \'artist\', \'title\') VALUES(?, ?, ?)', [artistId, artist, album], function(tx, results) {
						var albumId = results.insertId;

						// Insert track.
						tx.executeSql('INSERT INTO tracks(\'album_id\', \'track_number\', \'artist\', \'title\', \'path\', \'listened\') VALUES(?, ?, ?, ?, ?, 0)', [albumId, trackNumber, contributingArtist != undefined ? contributingArtist : artist, title, path], function(tx, results) {
							callback(true); return;
						}, function(error) {
							callback(false); return;
						});
					}, function(error) {
						callback(false); return;
					});
				} else {
					var albumId = results.rows.item(0).id;

					// Insert track.
					tx.executeSql('INSERT INTO tracks(\'album_id\', \'track_number\', \'artist\', \'title\', \'path\', \'listened\') VALUES(?, ?, ?, ?, ?, 0)', [albumId, trackNumber, contributingArtist != undefined ? contributingArtist : artist, title, path], function(tx, results) {
						callback(true); return;
					}, function(error) {
						callback(false); return;
					});
				}
			},  function(error) {
				callback(false); return;
			});
		};

		this.database.transaction(function(tx) {
			// Look for the artist first.
			tx.executeSql('SELECT * FROM artists WHERE name = ?', [artist], function(tx, results) {
				// If none was found, add a new row.
				if (results.rows.length == 0) {
					tx.executeSql('INSERT INTO artists(\'name\') VALUES(?)', [artist], function(tx, results) {
						var artistId = results.insertId;
						insertAlbumData(artistId, tx);
					}, function(error) {
						callback(false); return;
					});
				} else {
					var artistId = results.rows.item(0).id;
					insertAlbumData(artistId, tx);
				}
			}, function(error) {
				callback(false); return;
			});
		}, function(error) {
			callback(false); return;
		});
	},

	emptyLibrary: function() {
		this.database.transaction(function(tx) {
			tx.executeSql('DELETE FROM artists');
			tx.executeSql('DELETE FROM albums');
			tx.executeSql('DELETE FROM tracks');

			util.showOsdCallout('Library', 'The library is now empty');
		});
	},

	getArtists: function(callback) {
		this.database.transaction(function(tx) {
			tx.executeSql('SELECT * FROM artists WHERE id ORDER BY name ASC', [], function(tx, results) {
				if (results.rows.length == 0) {
					callback(false); return;
				}

				var artists = [];
				for (var i = 0; i < results.rows.length; i++) {
					artists[i] = results.rows.item(i);

					if (i >= (results.rows.length - 1)) {
						callback(artists);
					}
				}
			}, function(error) {
				console.log(error);
				callback(false); return;
			});
		}, function(error) {
			console.log(error);
			callback(false); return;
		});
	},

	getAlbums: function(artistId, callback) {
		this.database.transaction(function(tx) {
			tx.executeSql('SELECT * FROM albums WHERE artist_id = ? ORDER BY title ASC', [artistId], function(tx, results) {
				if (results.rows.length == 0) {
					callback(false); return;
				}

				var albums = [];
				for (var i = 0; i < results.rows.length; i++) {
					albums[i] = results.rows.item(i);

					if (i >= (results.rows.length - 1)) {
						callback(albums);
					}
				}
			}, function(error) {
				console.log(error);
				callback(false); return;
			});
		}, function(error) {
			callback(false); return;
		});
	},

	getTracks: function(albumId, callback) {
		this.database.transaction(function(tx) {
			tx.executeSql('SELECT * FROM tracks WHERE album_id = ? ORDER BY track_number ASC', [albumId], function(tx, results) {
				if (results.rows.length == 0) {
					callback(false); return;
				}

				var tracks = [];
				for (var i = 0; i < results.rows.length; i++) {
					tracks[i] = results.rows.item(i);

					if (i >= (results.rows.length - 1)) {
						callback(tracks);
					}
				}
			}, function(error) {
				console.log(error);
				callback(false); return;
			});
		}, function(error) {
			callback(false); return;
		});
	},

	setTrackListened: function(trackId, callback) {
		this.database.transaction(function(tx) {
			tx.executeSql('UPDATE tracks SET listened = 1 WHERE id = ?', [trackId], function(tx, results) {
				if (results.rows.length == 0) {
					callback(false); return;
				}

				callback(true); return;
			}, function(error) {
				console.log(error);
				callback(false); return;
			});
		}, function(error) {
			callback(false); return;
		});
	}
};