//Path to the controllers are referenced here
define(function(){
	return [
		'lib/app-scripts/config/appConfig',

		'lib/app-scripts/services/appService',
		'lib/app-scripts/services/logService',

		'lib/app-scripts/directives/homeDirective',
		'lib/app-scripts/directives/dashboardDirective',
		'lib/app-scripts/directives/fileuploadDirective',
		'lib/app-scripts/directives/alertDirective',
		'lib/app-scripts/directives/projectdetailDirective'
	];
});