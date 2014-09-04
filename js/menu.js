//  ____       _                          _           _               
 // / ___|  ___| |_ _   _ _ __   __      _(_)_ __   __| | _____      __
 // \___ \ / _ \ __| | | | '_ \  \ \ /\ / / | '_ \ / _` |/ _ \ \ /\ / /
 //  ___) |  __/ |_| |_| | |_) |  \ V  V /| | | | | (_| | (_) \ V  V / 
 // |____/ \___|\__|\__,_| .__/    \_/\_/ |_|_| |_|\__,_|\___/ \_/\_/  
 //                      |_|                                           

var gui = require('nw.gui');
var win = gui.Window.get();
var menubar = new gui.Menu({ type: 'menubar' });


 //  __  __                  _                             _   _                 
 // |  \/  | ___ _ __  _   _| |__   __ _ _ __    __ _  ___| |_(_) ___  _ __  ___ 
 // | |\/| |/ _ \ '_ \| | | | '_ \ / _` | '__|  / _` |/ __| __| |/ _ \| '_ \/ __|
 // | |  | |  __/ | | | |_| | |_) | (_| | |    | (_| | (__| |_| | (_) | | | \__ \
 // |_|  |_|\___|_| |_|\__,_|_.__/ \__,_|_|     \__,_|\___|\__|_|\___/|_| |_|___/
                                                                              
var fileMenu = new gui.Menu();
var viewMenu = new gui.Menu();
var playbackMenu = new gui.Menu();
var libraryMenu = new gui.Menu();
var helpMenu = new gui.Menu();

menubar.append(
new gui.MenuItem({
		label: 'File',
		submenu: fileMenu
	}
)); menubar.append(
new gui.MenuItem({
		label: 'View',
		submenu: viewMenu
	}
)); menubar.append(
new gui.MenuItem({
		label: 'Playback',
		submenu: playbackMenu
	}
)); menubar.append(
new gui.MenuItem({
		label: 'Help',
		submenu: helpMenu
	}
));


 //  _____ _ _                                   
 // |  ___(_) | ___   _ __ ___   ___ _ __  _   _ 
 // | |_  | | |/ _ \ | '_ ` _ \ / _ \ '_ \| | | |
 // |  _| | | |  __/ | | | | | |  __/ | | | |_| |
 // |_|   |_|_|\___| |_| |_| |_|\___|_| |_|\__,_|
                                              
fileMenu.append(new gui.MenuItem({
		label: 'Open',
		click: function() {
			if (busy) return;

			util.chooseFile(function(path) {
				playlistActions.stop();
				playlistActions.clear();
				playlistActions.fillPlaylist(file);
			});
		}
	}
));
fileMenu.append(new gui.MenuItem({ type: 'separator' }));
fileMenu.append(new gui.MenuItem({
		label: 'Add files',
		click: function() {
			if (busy) return;

			util.chooseMultipleFiles(function(files) {
				playlistActions.fillPlaylist(files);
			});
		}
	}
));
fileMenu.append(new gui.MenuItem({
		label: 'Add folder',
		click: function() {
			if (busy) return;

			util.getCompatibleFilesInFolder(function(files) {
				playlistActions.fillPlaylist(files);
				util.closeLoadingDialog();
			});
		}
	}
));
fileMenu.append(new gui.MenuItem({ type: 'separator' }));
fileMenu.append(new gui.MenuItem({
		label: 'New playlist',
		click: function() {
			if (busy) return;

			playlistActions.stop();
			playlistActions.clear();
		}
	}
));
fileMenu.append(new gui.MenuItem({
		label: 'Open playlist',
		click: function() {
			if (busy) return;

			playlistActions.stop();
			playlistActions.clear();
			playlistActions.createFromFile();
		}
	}
));
fileMenu.append(new gui.MenuItem({
		label: 'Save playlist',
		click: function() {
			if (busy) return;
		}
	}
));
fileMenu.append(new gui.MenuItem({ type: 'separator' }));
fileMenu.append(new gui.MenuItem({
		label: 'Settings',
		click: function() {
			if (busy) return;
			document.location = '#/settings';
		}
	}
));
fileMenu.append(new gui.MenuItem({ type: 'separator' }));
fileMenu.append(new gui.MenuItem({
		label: 'Exit',
		click: function() {
			if (busy) return;
		}
	}
));


 // __     ___                                            
 // \ \   / (_) _____      __  _ __ ___   ___ _ __  _   _ 
 //  \ \ / /| |/ _ \ \ /\ / / | '_ ` _ \ / _ \ '_ \| | | |
 //   \ V / | |  __/\ V  V /  | | | | | |  __/ | | | |_| |
 //    \_/  |_|\___| \_/\_/   |_| |_| |_|\___|_| |_|\__,_|
 
viewMenu.append(new gui.MenuItem({
		label: 'Equalizer',
		click: function() {
			if (busy) return;

			$('#equalizer-dialog').dialog({
				width: 850,
				height: 180,
				modal: true,
				resizable: false,
				draggable: false
			});

			$('#equalizer-dialog button').click(function() {
				$('#equalizer-dialog').dialog('close');
			});
		}
	}
));
viewMenu.append(new gui.MenuItem({
		label: 'Visualizations',
		click: function() {
			if (busy) return;
		}
	}
));


 //  ____  _             _                _                                 
 // |  _ \| | __ _ _   _| |__   __ _  ___| | __  _ __ ___   ___ _ __  _   _ 
 // | |_) | |/ _` | | | | '_ \ / _` |/ __| |/ / | '_ ` _ \ / _ \ '_ \| | | |
 // |  __/| | (_| | |_| | |_) | (_| | (__|   <  | | | | | |  __/ | | | |_| |
 // |_|   |_|\__,_|\__, |_.__/ \__,_|\___|_|\_\ |_| |_| |_|\___|_| |_|\__,_|
 //                |___/                                                    

playbackMenu.append(new gui.MenuItem({
		label: 'Stop',
		click: function() {
			if (busy) return;

			playlistActions.stop();
		}
	}
));
playbackMenu.append(new gui.MenuItem({
		label: 'Play',
		click: function() {
			if (busy) return;

			playlistActions.play();
		}
	}
));
playbackMenu.append(new gui.MenuItem({
		label: 'Pause',
		click: function() {
			if (busy) return;

			playlistActions.pause();
		}
	}
));
playbackMenu.append(new gui.MenuItem({ type: 'separator' }));
playbackMenu.append(new gui.MenuItem({
		label: 'Previous',
		click: function() {
			if (busy) return;

			playlistActions.back();
		}
	}
));
playbackMenu.append(new gui.MenuItem({
		label: 'Next',
		click: function() {
			if (busy) return;

			playlistActions.forward();
		}
	}
));
playbackMenu.append(new gui.MenuItem({
		label: 'Random',
		click: function() {
			if (busy) return;

			playlistActions.forwardRand();
		}
	}
));

 //  _   _      _                                    
 // | | | | ___| |_ __    _ __ ___   ___ _ __  _   _ 
 // | |_| |/ _ \ | '_ \  | '_ ` _ \ / _ \ '_ \| | | |
 // |  _  |  __/ | |_) | | | | | | |  __/ | | | |_| |
 // |_| |_|\___|_| .__/  |_| |_| |_|\___|_| |_|\__,_|
 //              |_|                                 

helpMenu.append(new gui.MenuItem({
		label: 'About Ichigo',
		click: function() {
			if (busy) return;
			
			$('#about-dialog').dialog({
				width: 400,
				height: 450,
				modal: true,
				resizable: false,
				draggable: false
			});

			checkForUpdates();

			$('#about-dialog button').click(function() {
				$('#about-dialog').dialog('close');
			});
		}
	}
));

win.menu = menubar;