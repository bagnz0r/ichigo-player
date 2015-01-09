app.controller('LibraryCtrl', function($scope) {
	var sizeHack = function() { 
		$('aside.library').css('height', $('body').height() - 78); 
		$('aside.library .filter').css('width', $('aside.library').width());
	};
	sizeHack();
	$(window).resize(function() {
		sizeHack();
	});

	$scope.selectedTrackList = -1;
	$scope.selectedTrack = -1;

	// This menu will pop up when the user right-clicks on any libraryitem
	var getRandomAlbum = function(callback) {
		mediaLibrary.getArtists(function(result) {
			var artists = result ? result : [];
			if (artists.length) {
				var randomArtist = artists[util.getRandomInt(0, artists.length)];
				mediaLibrary.getAlbums(randomArtist.id, function(albums) {
					if (albums.length) {
						var randomAlbum = albums[util.getRandomInt(0, albums.length)];

						mediaLibrary.getTracks(randomAlbum.id, function(tracks) {
							randomAlbum.tracks = tracks;

							if (randomAlbum.tracks.length) {
								var files = [];
								for (var i = 0; i < randomAlbum.tracks.length; i++) {
									files[i] = {
										'libraryId': randomAlbum.tracks[i].id,
										'path': randomAlbum.tracks[i].path,
										'listened': randomAlbum.tracks[i].listened,
									};

									if (i >= (randomAlbum.tracks.length - 1)) {
										callback(files);
									}
								}
							}
						});
					}
				});
			}
		});
	};
	var libraryMenu = new gui.Menu();
	libraryMenu.append(new gui.MenuItem({
			label: 'Replace playlist with random album',
			click: function() {
				getRandomAlbum(function(files) {
					playlistActions.clear();
					playlistActions.fillPlaylist(files);
				});
			}
		}
	));
	libraryMenu.append(new gui.MenuItem({
			label: 'Add random album to playlist',
			click: function() {
				getRandomAlbum(function(files) {
					playlistActions.fillPlaylist(files);
				});
			}
		}
	));

	// This menu will pop up when the user right-clicks on an album
	var getAlbum = function(callback) {
		if ($scope.selectedTrackList) {
			var files = [];
			for (var i = 0; i < $scope.selectedTrackList.length; i++) {
				files[i] = {
					'libraryId': $scope.selectedTrackList[i].id,
					'path': $scope.selectedTrackList[i].path,
					'listened': $scope.selectedTrackList[i].listened
				};

				if (i >= ($scope.selectedTrackList.length - 1)) {
					callback(files);
				}
			}
		}
	};
	var albumMenu = new gui.Menu();
	albumMenu.append(new gui.MenuItem({
			label: 'Replace the playlist',
			click: function() {
				getAlbum(function(files) {
					playlistActions.clear();
					playlistActions.fillPlaylist(files);
				});
			}
		}
	));
	albumMenu.append(new gui.MenuItem({
			label: 'Add to playlist',
			click: function() {
				getAlbum(function(files) {
					playlistActions.fillPlaylist(files);
				});
			}
		}
	));

	// This menu will pop up when the user right-clicks on a track
	var trackMenu = new gui.Menu();
	trackMenu.append(new gui.MenuItem({
			label: 'Replace the playlist',
			click: function() {
				playlistActions.clear();
				playlistActions.fillPlaylist([$scope.selectedTrack]);
			}
		}
	));
	trackMenu.append(new gui.MenuItem({
			label: 'Add to playlist',
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

	// This scope function will spawn the library menu on right click.
	$scope.spawnLibraryMenu = function(event) {
		libraryMenu.popup(event.x, event.y);
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
		console.log('Library: Loaded ' + $scope.artists.length + ' artists');
		
		for (var i = 0; i < $scope.artists.length; i++) {
			setAlbums($scope.artists[i]);
		}
	});
});