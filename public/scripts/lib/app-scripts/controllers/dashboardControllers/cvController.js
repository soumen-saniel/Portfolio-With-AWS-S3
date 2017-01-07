define(function(){
	var app = angular.module("coreModule");
	app.registerController("cvController", ["appService", "logService", cvController]);
	function cvController(appService, logService){
		var ctrl = this;
		ctrl.skills = [
			{
				category : 'Basics',
				name : 'HTML5',
				percentage : '90'
			},
			{
				category : 'Basics',
				name : 'CSS3',
				percentage : '90'
			},
			{
				category : 'Basics',
				name : 'JAVA SCRIPT',
				percentage : '90'
			},
			{
				category : 'JavaScript Library',
				name : 'JQuery',
				percentage : '65'
			},
			{
				category : 'Script Loader',
				name : 'Require JS',
				percentage : '60'
			},
			{
				category : 'Javascript Framework',
				name : 'Angular JS',
				percentage : '80'
			},
			{
				category : 'CSS Framework',
				name : 'Bootstrap',
				percentage : '90'
			},
			{
				category : 'CSS Framework',
				name : 'Zurb Foundation',
				percentage : '90'
			},
			{
				category : 'CSS Framework',
				name : 'Angular Material',
				percentage : '50'
			},
			{
				category : 'Server side technologies',
				name : 'Node JS, NPM',
				percentage : '50'
			},
			{
				category : 'No SQL data base',
				name : 'Mongo DB',
				percentage : '50'
			},
			{
				category : 'Task runner',
				name : 'Gulp',
				percentage : '50'
			},
		]
	}
});