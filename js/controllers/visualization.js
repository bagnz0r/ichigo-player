app.controller('VisualizationCtrl', function ($scope) {
	var canvas = document.getElementById('visualization');
	var ctx = canvas.getContext('2d');

	// Track position update timer.
	setInterval(function() {
		if (ichigoAudio.ig_is_stream_active()) {
			var fft = ichigoAudio.ig_get_fft_avg();
			ctx.fillStyle = '#888';
			ctx.fillRect(0, 12 - (12 * fft), 96, 12 * fft);
		}
	}, 33);
});