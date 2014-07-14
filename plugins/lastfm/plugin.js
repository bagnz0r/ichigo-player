//
// Last.fm plugin for Ichigo
// v1.0
//
// http://github.com/bagnz0r
//

var keys = {
	'public': '82fd45187446f505ff25002dfcdece66',
	'private': '317bd13025edfb2e070cd6f5eb38277f'
};

var lastfm = -1;

var scrobbled = false;
var track = {};
var stamp = 0;

$(document).ready(function() {
	if (!(localStorage.getItem('lastm.enabled') || true)) return;

	lastfm = new LastFM({
		apiKey: keys.public,
		apiSecret: keys.private
	});
});

function lastfm_Authenticate(username) {
	if (localStorage['lastfm.session'] == undefined) {
		lastfm.auth.getToken({
			success: function (data) {
				var auth = window.open('http://last.fm/api/auth/?api_key=' + keys.public + '&token=' + data.token);
				var timer = setInterval(function () {
					if (!auth.closed) return;

					clearInterval(timer);

					lastfm.auth.getSession({
						username: username,
						token: data.token
					}, {
						success: function(data) {
							localStorage['lastfm.session'] = JSON.stringify(data.session);
						},
						error: function(code, message) {
							alert(message);
						}
					});
				}, 1000);
			}
		});
	}
}

util.addPluginAction('onTrackBegin', function(_track) {
	if (!(localStorage.getItem('lastm.enabled') || true)) return;

	scrobbled = false;
	track = _track;
	stamp = Math.round(new Date().getTime() / 1000);

	console.log('Last.fm: Track started');

	lastfm.track.updateNowPlaying(
	{
		artist: track.tags.artist,
		track: track.tags.title,
		album: track.tags.album == undefined ? '' : track.tags.album
	}, JSON.parse(localStorage['lastfm.session']), {
		success: function (data) {
			console.log('Last.fm: Updated now playing ');
			console.log(data);
		},
		error: function (code, message) {
			console.log('Last.fm: Error ' + message);
		}
	});
});

util.addPluginAction('onTrackPositionUpdate', function (pos, len) {
	if (!(localStorage.getItem('lastm.enabled') || true)) return;
	if (track.tags.title == undefined || track.tags.artist == undefined) return;

	var percentage = pos / len * 100;
	console.log('Last.fm: Track at ' + percentage + '%');
	if (percentage > (localStorage.getItem('lastm.minimumScrobbleThreshold') || 50) && !scrobbled) {
		lastfm.track.scrobble([
			{
				artist: track.tags.artist,
				track: track.tags.title,
				timestamp: stamp,
				album: track.tags.album == undefined ? '' : track.tags.album
			}
		], JSON.parse(localStorage['lastfm.session']), {
			success: function (data) {
				console.log('Last.fm: Scrobbled ');
				console.log(data);

				scrobbled = true;
			},
			error: function (code, message) {
				console.log('Last.fm: Error ' + message);
			}
		});
	}
});