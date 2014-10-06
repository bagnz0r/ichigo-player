app.controller('VisualizationCtrl', function ($scope) {
	var canvas = document.getElementById('visualization');
	var ctx = canvas.getContext('2d');

	var w = 96;
	var h = 24;

	// Track position update timer.
	setInterval(function() {
		if (ichigoAudio.ig_is_stream_active()) {
			var avg = ichigoAudio.ig_get_fft_avg();

			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, w, h);

			ctx.fillStyle = '#888';
			ctx.fillRect(0, (h - (h * (avg * 2))), w, h * avg);
		}
	}, 33);
});