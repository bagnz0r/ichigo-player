app.controller('VisualizationCtrl', function ($scope) {
	var canvas = document.getElementById('visualization');
	var ctx = canvas.getContext('2d');

	var w = 256;
	var h = 192;
	var sz = 2;

	var histogram = [];

	// Fill histogram with dummy data.
	for (var i = 0; i < Math.floor(w / sz); i++) {
		histogram.push(0);
	}

	// Track position update timer.
	setInterval(function() {
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, w, h);

		if (ichigoAudio.ig_is_stream_active()) {
			histogram.push(ichigoAudio.ig_get_fft_avg());
			if (histogram.length > Math.floor(w / sz)) {
				histogram.splice(0, 1);
			}

			for (var i = 0; i < histogram.length; i++) {
				var avg = histogram[i];
				ctx.fillStyle = 'rgba(' + Math.round(util.clamp((avg * 3) * 255, 0, 255)) + ', 0, 100, 1)';
				ctx.fillRect(i * sz, util.clamp(h  - (avg * (h + 6) * 2), 1, h), sz, util.clamp((avg * (h + 6) * 2), 1, h));
			}
		}
	}, 14);
});