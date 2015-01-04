app.controller('SettingsCtrl', function($scope) {
	$('#settings-tabs').tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
	$('#tabs li').removeClass('ui-corner-top').addClass('ui-corner-left');

	$scope.availableDevices = [
		{
			id: -1,
			name: 'System default'
		}
	];
	$scope.currentDevice = util.getSettingsValue('playback.device', -1);

	// TODO: This needs to be fetched from core library.
	$scope.availableFrequencies = [
		44100,
		48000,
		96000,
		192000
	];
	$scope.currentFrequency = util.getSettingsValue('playback.frequency', 44100);

	var deviceCount = ichigoAudio.ig_get_device_count();
	for (var i = 0; i < deviceCount; i++) {
		var deviceName = ichigoAudio.ig_get_device_name(i);
		if (deviceName) {
			$scope.availableDevices.push({
				id: i,
				name: deviceName
			});
		}
	}

	$scope.addMediaToLibrary = function() {
		util.mediaLibraryScanFolder();
	};

	$scope.clearLibrary = function() {
		mediaLibrary.emptyLibrary();
	};

	$scope.setOutputDevice = function() {
		util.setSettingsValue('playback.device', $scope.currentDevice);
	};

	$scope.setOutputFrequency = function() {
		util.setSettingsValue('playback.frequency', $scope.currentFrequency);
	};
});