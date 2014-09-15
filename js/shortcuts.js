var playPauseShortcut = new gui.Shortcut({
	key: 'MediaPlayPause',
	active : function() {
		if (playing) {
			if (playlistActions.pause()) {
				util.showOsdCallout('Pause', 'The track is now paused');
			}
		} else {
			if (playlistActions.play()) {
				util.showOsdCallout('Play', 'The track is now playing');
			}
		}
	},
	failed : function(msg) {
		console.log('Shortcut error ' + msg);
	}
});
gui.App.registerGlobalHotKey(playPauseShortcut);

var playPauseShortcutAlt = new gui.Shortcut({
	key: isWindowsRelease ? 'Ctrl+Shift+P' : 'Cmd+Shift+P',
	active : function() {
		if (playing) {
			if (playlistActions.pause()) {
				util.showOsdCallout('Pause', 'The track is now paused');
			}
		} else {
			if (playlistActions.play()) {
				util.showOsdCallout('Play', 'The track is now playing');
			}
		}
	},
	failed : function(msg) {
		console.log('Shortcut error ' + msg);
	}
});
gui.App.registerGlobalHotKey(playPauseShortcutAlt);

var nextTrackShortcut = new gui.Shortcut({
	key: 'MediaNextTrack',
	active : function() {
		if (playing) {
			util.showOsdCallout('Next', 'Skipping to next track');
			playlistActions.forward();
		}
	},
	failed : function(msg) {
		console.log('Shortcut error ' + msg);
	}
});
gui.App.registerGlobalHotKey(nextTrackShortcut);


var nextTrackShortcutAlt = new gui.Shortcut({
	key: isWindowsRelease ? 'Ctrl+Shift+N' : 'Cmd+Shift+N',
	active : function() {
		if (playing) {
			util.showOsdCallout('Next', 'Skipping to next track');
			playlistActions.forward();
		}
	},
	failed : function(msg) {
		console.log('Shortcut error ' + msg);
	}
});
gui.App.registerGlobalHotKey(nextTrackShortcutAlt);


var prevTrackShortcut = new gui.Shortcut({
	key: 'MediaNextTrack',
	active : function() {
		if (playing) {
			util.showOsdCallout('Previous', 'Going back to previous track');
			playlistActions.back();
		}
	},
	failed : function(msg) {
		console.log('Shortcut error ' + msg);
	}
});
gui.App.registerGlobalHotKey(prevTrackShortcut);


var prevTrackShortcutAlt = new gui.Shortcut({
	key: isWindowsRelease ? 'Ctrl+Shift+B' : 'Cmd+Shift+B',
	active : function() {
		if (playing) {
			util.showOsdCallout('Previous', 'Going back to previous track');
			playlistActions.back();
		}
	},
	failed : function(msg) {
		console.log('Shortcut error ' + msg);
	}
});
gui.App.registerGlobalHotKey(prevTrackShortcutAlt);