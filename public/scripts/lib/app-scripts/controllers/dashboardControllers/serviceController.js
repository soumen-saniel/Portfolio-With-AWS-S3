define(function(){
	var app = angular.module("coreModule");
	app.registerController("serviceController",["appService", "logService", serviceController]);
	function serviceController(appService, logService){
		//-----------------------------------------------------------------------------------------------
		//Veriables
		//-----------------------------------------------------------------------------------------------
		var ctrl = this;
		ctrl.services = [];
		var dummyDocument = {
			title : "",
			image : "/img/dummy.png",
    		link : ""
		}
		//-----------------------------------------------------------------------------------------------
		//Configuration
		//-----------------------------------------------------------------------------------------------
		ctrl.url = {
			db : '/api/service',
			fs : '/api/service/img'
		}
		ctrl.fsDir = '/img/service/';
		//-----------------------------------------------------------------------------------------------
		//Inetial get
		//-----------------------------------------------------------------------------------------------
		appService.get(ctrl.url.db).then(
	        function(response) {
	        	ctrl.services = response.data;
				deleteResourcesOnLoad(response.data);
	        }, 
	        function(err) {
	        	alert("Error : Data get!");
	            logService.failed('appService.get()', err);
	        }
	    );
	    //-----------------------------------------------------------------------------------------------
		//Helper functions
		//-----------------------------------------------------------------------------------------------
		function deleteResourcesOnLoad(value){
			var imgArr = [];
            angular.forEach(value, function (val, key){
            	val = val.image;
            	val = val.split("/");
            	val = val[val.length - 1];
            	imgArr.push(val);
            });
        	appService.delete(ctrl.url.fs, {file : imgArr}).then(
	    		function(response){
	    			//logService.success('appService.delete()', response);
	    		},function(err){
	    			// alert("Error : Resources delete!");
	    			// logService.failed('appService.delete()', err);
	    		}
    		);
		}
	    
	    //-----------------------------------------------------------------------------------------------
		//CRUD Operations
		//-----------------------------------------------------------------------------------------------
	    ctrl.addNew = function(){
	    	ctrl.services.push(angular.copy(dummyDocument));
	    }
	    ctrl.save = function(data){
	    	if(data._id){
	    		appService.put(ctrl.url.db, data).then(
		    		function(response){
		    			ctrl.services = response.data;
		    			alert("Data updated successfully.");
		    			//logService.success('appService.post()', response);
		    		},function(err){
		    			alert("Error : Data updated!");
		    			logService.failed('appService.post()', err);
		    		}
	    		);

	    	}else{
		    	appService.post(ctrl.url.db, data).then(
		    		function(response){
		    			ctrl.services = response.data;
		    			alert("Data saved successfully.");
		    			//logService.success('appService.put()', response);
		    		},function(err){
		    			alert("Error : Data save!");
		    			logService.failed('appService.put()', err);
		    		}
	    		);
		    }
	    }
	    ctrl.remove = function(data){
	    	if(data._id){
	    		appService.delete(ctrl.url.db, data).then(
		    		function(response){
		    			ctrl.services = response.data;
		    			alert("Data removed successfully.");
		    			//logService.success('appService.delete()', response);
		    		},function(err){
		    			alert("Error : Data remove!");
		    			logService.failed('appService.delete()', err);
		    		}
	    		);
	    	}else{
	    		var index = ctrl.services.indexOf(data);
	    		ctrl.services.splice(index, 1);
	    	}
	    }  
	}
});