app.controller('ThemesCtrl', function($scope) {
	$scope.themes = themes;
	$scope.currentTheme = -1;

	$scope.setTheme = function(index) {
		$scope.currentThem = index;
		localStorage['currentTheme'] = themes[index];
		
		util.reloadTheme(themes[index]);
	}
});