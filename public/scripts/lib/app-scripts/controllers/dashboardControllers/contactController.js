define(function(){
	var app = angular.module("coreModule");
	app.registerController("contactController", ["appService", "logService", contactController]);
	function contactController(appService, logService){
		//-----------------------------------------------------------------------------------------------
		//Veriables
		//-----------------------------------------------------------------------------------------------
		var ctrl = this;
		ctrl.contact = {
			address : "",
			phone : "",
			mail : ""
		};
		ctrl.socialNetworks = [];
		var dummyDocument = {
			url : "",
			image : "/img/dummy.png"
		}
		//-----------------------------------------------------------------------------------------------
		//Configuration
		//-----------------------------------------------------------------------------------------------
		ctrl.url = {
			contactdb : '/api/contact',
			socialdb : '/api/social',
			fs : '/api/social/img'
		}
		ctrl.fsDir = '/img/social/';
		//-----------------------------------------------------------------------------------------------
		//Initial get
		//-----------------------------------------------------------------------------------------------
		appService.get(ctrl.url.contactdb).then(
			function (response){

				if(response.data.length > 0)
					ctrl.contact = response.data[0];
			},
			function (err) {
	        	alert("Error : Data get!");
	            logService.failed('appService.get()', err);
	        }
		);
		appService.get(ctrl.url.socialdb).then(
			function (response){
				ctrl.socialNetworks = response.data;
				if(response.data.length > 0)
					deleteResourcesOnLoad(response.data);
			},
			function (err) {
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
		//CRUD operations
		//-----------------------------------------------------------------------------------------------
		ctrl.addNew = function(){
			ctrl.socialNetworks.push(angular.copy(dummyDocument));
		}
		ctrl.saveContact = function(data){
	    	if(data._id){
	    		appService.put(ctrl.url.contactdb, data).then(
		    		function(response){
		    			if(response.data.length > 0)
							ctrl.contact = response.data[0];
		    			alert("Data updated successfully.");
		    			//logService.success('appService.put()', response);
		    		},function(err){
		    			alert("Error : Data update!");
		    			logService.failed('appService.put()', err);
		    		}
	    		);

	    	}else{
		    	appService.post(ctrl.url.contactdb, data).then(
		    		function(response){
		    			if(response.data.length > 0)
							ctrl.contact = response.data[0];
		    			alert("Data saved successfully.");
		    			//logService.success('appService.post()', response);
		    		},function(err){
		    			alert("Error : Data save!");
		    			logService.failed('appService.post()', err);
		    		}
	    		);
		    }
	    }

	    ctrl.saveSocial = function(data){
	    	if(data._id){
	    		appService.put(ctrl.url.socialdb, data).then(
		    		function(response){
		    			ctrl.socialNetworks = response.data;
		    			alert("Data updated successfully.");
		    			//logService.success('appService.put()', response);
		    		},function(err){
		    			alert("Error : Data update!");
		    			logService.failed('appService.put()', err);
		    		}
	    		);

	    	}else{
		    	appService.post(ctrl.url.socialdb, data).then(
		    		function(response){
		    			ctrl.socialNetworks = response.data;
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
	    		appService.delete(ctrl.url.socialdb, data).then(
		    		function(response){
		    			ctrl.socialNetworks = response.data;
		    			alert("Data deleted successfully.");
		    			//logService.success('appService.delete()', response);
		    		},function(err){
		    			alert("Error : Data delete!");
		    			logService.failed('appService.delete()', err);
		    		}
	    		);
	    	}else{
	    		var index = ctrl.socialNetworks.indexOf(data);
	    		ctrl.socialNetworks.splice(index, 1);
	    	}
	    }
	}
});