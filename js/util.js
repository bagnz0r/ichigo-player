var util = {
	chooseFile: function (fileChosenCallback) {
	 	var chooser = $('#file');
		chooser.change(function(evt) {
			var val = $(this).val();
			console.log(val);
			if (val != '') {
				fileChosenCallback(val);
			}
		});

		chooser.trigger('click');  
	}
};