define(function(){
	var app = angular.module("coreModule");
	app.registerController('dashboardController', ["appService", "logService", dashboardController]);
	function dashboardController(appService, logService){
    	//-----------------------------------------------------------------------------------------------
		//Veriables
		//-----------------------------------------------------------------------------------------------
		var ctrl = this;
		ctrl.credentials = {
			loginusername : "",
            loginpassword : "",
            emailserviceusername : "",
            emailservicepassword : ""
		}
		//-----------------------------------------------------------------------------------------------
		//Configuration
		//-----------------------------------------------------------------------------------------------
		ctrl.url = {
			db : '/api/login'
		}
		//-----------------------------------------------------------------------------------------------
		//Inetial get
		//-----------------------------------------------------------------------------------------------
		appService.get(ctrl.url.db).then(
	        function(response) {
	        	ctrl.credentials = response.data[0];
	        }, 
	        function(err) {
	        	alert("Error : Data get!");
	            logService.failed('appService.get()', err);
	        }
	    );
	    //-----------------------------------------------------------------------------------------------
		//CRUD Operations
		//-----------------------------------------------------------------------------------------------
	    ctrl.updateCredentials = function(){
	    	appService.put(ctrl.url.db, ctrl.credentials).then(
	    		function(response){
	    			ctrl.credentials = response.data[0];
	    			alert("Data updated successfully.");
	    			//logService.success('appService.put()', response);
	    		},function(err){
	    			alert("Error : Data updated!");
	    			logService.failed('appService.put()', err);
	    		}
    		);
	    }
	}
});