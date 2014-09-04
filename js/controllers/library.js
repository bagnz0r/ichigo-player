app.controller('LibraryCtrl', function($scope) {
	// height hack
	var heightHack = function() { $('aside.library').css('height', $('body').height() - 78); };
	heightHack();
	$(window).resize(function() {
		heightHack();
	});

	$scope.selectedTrackList = -1;
	$scope.selectedTrack = -1;

	// This menu will pop up when the user right-clicks on an album
	var albumMenu = new gui.Menu();
	albumMenu.append(new gui.MenuItem({
			label: 'Send to playlist',
			click: function() {
				if ($scope.selectedTrackList) {
					var files = [];
					for (var i = 0; i < $scope.selectedTrackList.length; i++) {
						files[i] = $scope.selectedTrackList[i].path;

						if (i >= ($scope.selectedTrackList.length - 1)) {
							playlistActions.fillPlaylist(files);
						}
					}
				}
			}
		}
	));

	// This menu will pop up when the user right-clicks on a track
	var trackMenu = new gui.Menu();
	trackMenu.append(new gui.MenuItem({
			label: 'Send to playlist',
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
		for (var i = 0; i < $scope.artists.length; i++) {
			setAlbums($scope.artists[i]);
		}
	});
});