var initialized = false;
app.controller('HomeCtrl', function($scope) {
	if (!initialized) {

		// Show "alpha dialog"
		setTimeout(function() {
			$('#alpha-dialog').dialog({
				width: 500,
				height: 200,
				modal: true,
				resizable: false,
				draggable: false
			});
			$('#alpha-dialog button').click(function() {
				$('#alpha-dialog').dialog('close');
			});

			$('#startup').fadeOut();
		}, 1000);

		// Initialize media library.
		mediaLibrary.initialize();

		// Initialize plugins.
		util.getPluginFiles(function(files) {
			for (var i = 0; i < files.length; i++) {
				console.log('Loading plugin ' + files[i]);
				plugin.loadPluginAsset(files[i], 'js');

				if (i >= (files.length - 1)) {
					setTimeout(function() {
						for (var key in pluginActions.onInitialize) {
							pluginActions.onInitialize[key]();
						}
					}, 3000);
				}
			}
		});

		// Initialize themes.
		if (!localStorage['currentTheme']) {
			localStorage['currentTheme'] = 'default';
		}
		util.getThemeFolders(function(folders) {
			for (var i = 0; i < folders.length; i++) {
				var theme = folders[i].replace('.theme', '');
				themes.push(theme);

				if (localStorage['currentTheme'] == theme) {
					util.reloadTheme(theme);
				}
			}
		});
	}

	initialized = true;
});