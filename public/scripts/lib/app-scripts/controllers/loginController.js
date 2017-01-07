define(function(){
	var app = angular.module("coreModule");
	app.registerController('loginController', ["appService", "logService", "$rootScope", "$location", "$state", loginController]);
	function loginController(appService, logService, $rootScope, $location, $state){
    	var ctrl = this;
    	ctrl.userName = "";
    	ctrl.password = "";
    	ctrl.login = function(){
    		appService.post('/api/login', {username : ctrl.userName, password : ctrl.password}).then(
	    		function(response){
	    			if(response.status === 200){
	    				$rootScope.logedin = true;
	    				$state.go('admin');
	    			}
	    		},function(err){
	    			alert("Error : Login!");
	    			logService.failed('appService.post()', err);
	    		}
    		);
    	}
	}
});