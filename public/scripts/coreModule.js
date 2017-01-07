define(function(){
	//Main module
	var coreModule = angular.module("coreModule", ["angular.filter", "ngRoute", "ngFileUpload", "ui.router"]);
	//Lazy loading of controllers
	coreModule.config(['$controllerProvider', function($controllerProvider){
		coreModule.registerController = $controllerProvider.register;
	}])
	//Initiating authentication on route change
	coreModule.run(function ($rootScope, $location, $state) {
		$rootScope.logedin = false;
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			if(fromState.name === 'home' || fromState.name === 'login'){
				var to = (toState.name).split(".");
				to = to[0];
				if(fromState.name !== toState.name && to === 'admin' && !$rootScope.logedin){
					$state.transitionTo('login', {arg:'arg'});
					$rootScope.logedin = false;
					event.preventDefault();
				}
			}
		});
	});
	//Loading all angular components defined in appReferences file
	require(['lib/app-scripts/appReferences'], function(references) {
		require(references, function(){
			//Bootstraping angular to the document
			angular.bootstrap(document, ["coreModule"]);
		});
	});

});