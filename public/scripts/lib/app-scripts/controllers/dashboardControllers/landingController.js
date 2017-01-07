define(function(){
	var app = angular.module("coreModule");
	app.registerController("landingController", ["appService", "logService", landingController]);
	function landingController(appService, logService){
		//-----------------------------------------------------------------------------------------------
		//Veriables
		//-----------------------------------------------------------------------------------------------

		var ctrl = this;
		ctrl.heroSection = {
			slides : []
		}
		var dummyDocument = {
			image : "/img/dummy.png",
    		text : ""
		}
		//-----------------------------------------------------------------------------------------------
		//Configuration
		//-----------------------------------------------------------------------------------------------
		ctrl.url = {
			db : '/api/hero',
			fs : '/api/hero/img'
		}
		ctrl.fsDir = '/img/landing/';
		//-----------------------------------------------------------------------------------------------
		//Inetial get
		//-----------------------------------------------------------------------------------------------
		appService.get(ctrl.url.db).then(
	        function(response) {
	        	ctrl.heroSection = {
					slides : response.data
				}
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
	    			//logService.failed('appService.delete()', err);
	    		}
    		);
		}
	    
	    //-----------------------------------------------------------------------------------------------
		//CRUD Operations
		//-----------------------------------------------------------------------------------------------
	    ctrl.addNew = function(){
	    	ctrl.heroSection.slides.push({
	    		image : "/img/dummy.png",
	    		text : ""
	    	});
	    }
	    ctrl.save = function(data){
	    	if(data._id){
	    		appService.put(ctrl.url.db, data).then(
		    		function(response){
		    			ctrl.heroSection = {
							slides : response.data
						}
						alert("Data updated successfully");
		    			//logService.success('appService.post()', response);
		    		},function(err){
		    			alert("Error : Data update!");
		    			logService.failed('appService.put()', err);
		    		}
	    		);

	    	}else{
		    	appService.post(ctrl.url.db, data).then(
		    		function(response){
		    			ctrl.heroSection = {
							slides : response.data
						}
						alert("Data saved successfully");
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
		    			ctrl.heroSection = {
							slides : response.data
						}
						alert("Data deleted successfully");
		    			//logService.success('appService.delete()', response);
		    		},function(err){
		    			alert("Error : Data delete!");
		    			logService.failed('appService.delete()', err);
		    		}
	    		);
	    	}else{
	    		var index = ctrl.heroSection.slides.indexOf(data);
	    		ctrl.heroSection.slides.splice(index, 1);
	    	}
	    }  
	}
});