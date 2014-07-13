var util = {
	choosen: false,
	chooseFile: function (callback) {
		util.chosen = false;

		var chooser = document.querySelector('#file');
		chooser.addEventListener("change", function(evt) {
			if (this.value != '' && !util.chosen) {
				util.chosen = true;
				callback(this.value);
			}
		}, false);

		chooser.click();
	},
	chooseMultipleFiles: function (callback) {
		util.chosen = false;

		var chooser = document.querySelector('#file-multiple');
		chooser.addEventListener("change", function(evt) {
			if (this.value != '' && !util.chosen) {
				util.chosen = true;
				callback(this.value.split(';'));
			}
		}, false);

		chooser.click();
	}
};