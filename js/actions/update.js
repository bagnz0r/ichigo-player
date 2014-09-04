function checkForUpdates() {
	var ver = $('.ver');
	var verNo = parseFloat(ver.text().replace('v', '').replace('alpha', ''));
	ver.text(ver.text() + ' - Checking for updates...');

	$.ajax({
		url: 'http://ichigo-player.pl/version.txt',
		success: function(data) {
			var newVerNo = parseFloat(data);
			if (newVerNo > verNo) {
				ver.html('v' + verNo + ' alpha - <a href="http://ichigo-player.pl" target="_blank">Update available!</a>');
			}
		}, error: function(a, b, c) {
			ver.text('v' + verNo + ' alpha');
		}
	});
}