define(function(){
	var app = angular.module("coreModule");
	app.registerController("skillController", ["appService", "logService", skillController]);
	function skillController(appService, logService){
		//-----------------------------------------------------------------------------------------------
		//Veriables
		//-----------------------------------------------------------------------------------------------
		var ctrl = this;
		ctrl.skills = [];
		var dummyDocument = {
			category : "",
            name : "",
            percentage : 0
		}
		//-----------------------------------------------------------------------------------------------
		//Configuration
		//-----------------------------------------------------------------------------------------------
		ctrl.url = {
			db : '/api/skill'
		}
		//-----------------------------------------------------------------------------------------------
		//Inetial get
		//-----------------------------------------------------------------------------------------------
		appService.get(ctrl.url.db).then(
	        function(response) {
	        	ctrl.skills = response.data;
	        }, 
	        function(err) {
	        	alert("Error : Data get!");
	            logService.failed('appService.get()', err);
	        }
	    );
	    ctrl.addNew = function(){
	    	ctrl.skills.push(angular.copy(dummyDocument));
	    }
	    ctrl.save = function(data){
	    	if(data._id){
	    		appService.put(ctrl.url.db, data).then(
		    		function(response){
		    			ctrl.skills = response.data;
		    			alert("Data updated successfully.");
		    			//logService.success('appService.put()', response);
		    		},function(err){
		    			alert("Error : Data update!");
		    			logService.failed('appService.put()', err);
		    		}
	    		);

	    	}else{
		    	appService.post(ctrl.url.db, data).then(
		    		function(response){
		    			ctrl.skills = response.data;
		    			alert("Data saved successfully.");
		    			//logService.success('appService.post()', response);
		    		},function(err){
		    			alert("Error : Data save!");
		    			logService.failed('appService.post()', err);
		    		}
	    		);
		    }
	    }
	    ctrl.remove = function(data){
	    	if(data._id){
	    		appService.delete(ctrl.url.db, data).then(
		    		function(response){
		    			ctrl.skills = response.data;
		    			alert("Data deleted successfully.");
		    			//logService.success('appService.delete()', response);
		    		},function(err){
		    			alert("Error : Data delete!");
		    			logService.failed('appService.delete()', err);
		    		}
	    		);
	    	}else{
	    		var index = ctrl.skills.indexOf(data);
	    		ctrl.skills.splice(index, 1);
	    	}
	    }
	}
})