//
// Last.fm plugin for Ichigo
// v1.1
//
// http://github.com/bagnz0r
//

var lastfmPlugin = {

	//
	// Plugin scope
	//
	scope: 'lastfm',

	//
	// API keys
	//
	keys: {
		'public': '82fd45187446f505ff25002dfcdece66',
		'private': '317bd13025edfb2e070cd6f5eb38277f'
	},

	//
	// Last.fm object
	//
	lastfm: -1,

	//
	// Has the track been already scrobbled?
	//
	scrobbled: false,

	//
	// Track object
	//
	track: {},

	//
	// Scrobble start timestamp
	//
	stamp: 0,

	initialize: function() {
		// Initialize assets here
		plugin.loadPluginAsset('plugins/lastfm/components/lastfm/lastfm.api.js', 'js');
		plugin.loadPluginAsset('plugins/lastfm/components/lastfm/lastfm.api.cache.js', 'js');
		plugin.loadPluginAsset('plugins/lastfm/components/lastfm/lastfm.api.md5.js', 'js');

		setTimeout(function() {
			lastfmPlugin.lastfm = new LastFM({
				apiKey: lastfmPlugin.keys.public,
				apiSecret: lastfmPlugin.keys.private
			});

			plugin.addPluginAction('onGetInfo', function() {
				return {
					'name': 'Last.fm Scrobbler',
					'version': '1.1',
					'author': 'bagnz0r',
					'url': 'http://github.com/bagnz0r',
					'scope': lastfmPlugin.scope
				};
			});

			plugin.addPluginAction('onConfigure', lastfmPlugin.authenticate);
			plugin.addPluginAction('onTrackBegin', lastfmPlugin.trackBegin);
			plugin.addPluginAction('onTrackPositionUpdate', lastfmPlugin.trackPositionUpdate);
		}, 1000);
	},

	authenticate: function() {
		var username = prompt('Please enter your Last.fm username', '');
		if (username == undefined || username.length < 1) {
			return;
		}

		util.showLoadingDialog();

		lastfmPlugin.lastfm.auth.getToken({
			success: function (data) {
				var auth = window.open('http://last.fm/api/auth/?api_key=' + lastfmPlugin.keys.public + '&token=' + data.token);
				var timer = setInterval(function () {
					if (!auth.closed) return;

					clearInterval(timer);

					lastfmPlugin.lastfm.auth.getSession({
						username: username,
						token: data.token
					}, {
						success: function(data) {
							localStorage[lastfmPlugin.scope + '.session'] = JSON.stringify(data.session);
							util.closeLoadingDialog();
						},
						error: function(code, message) {
							alert('Last.fm: Configuration error!');
							util.closeLoadingDialog();
						}
					});
				}, 1000);
			}
		});
	},

	trackBegin: function(track) {
		if (!plugin.isPluginEnabled(lastfmPlugin.scope)) return;

		lastfmPlugin.scrobbled = false;
		lastfmPlugin.track = track;
		lastfmPlugin.stamp = Math.round(new Date().getTime() / 1000);

		lastfmPlugin.astfm.track.updateNowPlaying({
			artist: lastfmPlugin.track.tags.artist,
			track: lastfmPlugin.track.tags.title,
			album: lastfmPlugin.track.tags.album == undefined ? '' : lastfmPlugin.track.tags.album
		}, JSON.parse(localStorage[lastfmPlugin.scope + '.session']), {
				success: function (data) {
					console.log('Last.fm: Updated now playing ');
					console.log(data);
				},
				error: function (code, message) {
					console.log('Last.fm: Error ' + message);
				}
			}
		);
	},

	trackPositionUpdate: function(pos, len) {
		if (!plugin.isPluginEnabled(lastfmPlugin.scope)) return;
		if (lastfmPlugin.track.tags.title == undefined || lastfmPlugin.track.tags.artist == undefined) return;

		var percentage = pos / len * 100;
		if (percentage > (localStorage.getItem(lastfmPlugin.scope + '.minimumScrobbleThreshold') || 50) && !lastfmPlugin.scrobbled) {
			lastfm.track.scrobble([
				{
					artist: lastfmPlugin.track.tags.artist,
					track: lastfmPlugin.track.tags.title,
					timestamp: lastfmPlugin.stamp,
					album: lastfmPlugin.track.tags.album == undefined ? '' : lastfmPlugin.track.tags.album
				}
			], JSON.parse(localStorage[lastfmPlugin.scope + '.session']), {
				success: function (data) {
					console.log('Last.fm: Scrobbled ');
					console.log(data);

					lastfmPlugin.scrobbled = true;
				},
				error: function (code, message) {
					console.log('Last.fm: Error ' + message);
				}
			});
		}
	}
};

console.log('Last.fm plugin created');
plugin.addPluginAction('onInitialize', lastfmPlugin.initialize);