app.controller('EqualizerCtrl', function ($scope) {
	ichigoAudio.ig_enable_equalizer();

	var bands = [];
	for (var i = 1; i <= 18; i++) {
		bands[i] = $('#eq-band' + i);
		bands[i].slider({
			min: -1500,
			max: 1500,
			value: 0,
			orientation: 'vertical',
			change: function (event, ui) {
				var freq = $(this).attr('data-frequency');
				var id = $(this).attr('data-id');
				var gain = ui.value/100;

				ichigoAudio.ig_set_equalizer(parseInt(id), parseFloat(freq), gain);

				console.log('Equalizer: ' + freq + ' Hz @ ' + gain + ' db');
			}
		});

		bands[i].attr('data-id', i);
	}

	var presets = {
		'flat': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		'rock': [1.06, 0, -0.9, -2.09, -2.67, -3.24, -3.76, -3.76, -2.37, -2.37, -0.91, 0, 1.45, 2.54, 3.96, 5.17, 5.17, 3.96]
	}

	$scope.preset = 'flat';

	$scope.setEqualizerBands = function() {
		for (var i = 1; i <= 18; i++) {
			var band = $('#eq-band' + i);
			band.slider('value', (presets[$scope.preset][(i-1)] * 100));
		}
	}
});