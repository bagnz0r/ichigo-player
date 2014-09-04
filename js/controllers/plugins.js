app.controller('PluginsCtrl', function($scope) {
	var plugins = [];
	for (index in pluginActions.onGetInfo) {
		plugins[index] = pluginActions.onGetInfo[index]();
	}

	$scope.plugins = plugins;
	$scope.currentPlugin = -1;
	$scope.isEnabled = false;

	$scope.togglePlugin = function() {
		plugin.togglePlugin(plugins[$scope.currentPlugin].scope);
		$scope.isEnabled = plugin.isPluginEnabled(plugins[$scope.currentPlugin].scope);
	};

	$scope.configurePlugin = function() {
		pluginActions.onConfigure[index]();
	}

	$scope.setPlugin = function(index) {
		$scope.currentPlugin = index;
		$scope.isEnabled = plugin.isPluginEnabled(plugins[$scope.currentPlugin].scope);
	};
});