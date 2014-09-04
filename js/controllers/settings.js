app.controller('SettingsCtrl', function($scope) {
	$('#settings-tabs').tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
	$('#tabs li').removeClass('ui-corner-top').addClass('ui-corner-left');

	$scope.addMediaToLibrary = function() {
		util.mediaLibraryScanFolder();
	};

	$scope.clearLibrary = function() {
		mediaLibrary.emptyLibrary();
	};
});