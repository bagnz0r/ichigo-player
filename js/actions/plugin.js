var plugin = {

	//
	// Adds plugin action
	//
	addPluginAction: function(eventType, func) {
		pluginActions[eventType][pluginActions[eventType].length] = func;
	},

	//
	// Toggles plugin status
	//
	togglePlugin: function(scope) {
		localStorage[scope + '.enabled'] = localStorage[scope + '.enabled'] == "true" ? false : true;
		return localStorage[scope + '.enabled'];
	},

	//
	// Determines if the plugin is enabled
	//
	isPluginEnabled: function(scope) {
		return localStorage[scope + '.enabled'] == "true" ? true : false;
	},

	//
	// Loads asset for the plugin
	//
	loadPluginAsset: function(path, type) {
		util.loadAsset(path, type);
	}
	
};