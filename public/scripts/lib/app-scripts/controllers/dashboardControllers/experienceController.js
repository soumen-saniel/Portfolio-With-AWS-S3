define(function(){
	var app = angular.module("coreModule");
	app.registerController("experienceController", ["appService", "logService", experienceController]);
	function experienceController(appService, logService){
		//-----------------------------------------------------------------------------------------------
		//Veriables
		//-----------------------------------------------------------------------------------------------
		var ctrl = this;
		ctrl.experience = [];
		var dummyDocument = {
			work : true,
			image : "/img/dummy.png",
            title : "",
            organization : "",
            designation : "",
            description : "",
            start : new Date(),
            end : new Date()
		}
		//-----------------------------------------------------------------------------------------------
		//Configuration
		//-----------------------------------------------------------------------------------------------
		ctrl.url = {
			db : '/api/experience',
			fs : '/api/experience/img'
		}
		ctrl.fsDir = '/img/experience/';
		//-----------------------------------------------------------------------------------------------
		//Inetial get
		//-----------------------------------------------------------------------------------------------
		appService.get(ctrl.url.db).then(
	        function(response) {
	        	var data = [];
	        	angular.forEach(response.data, function (val, key){
	        		data.push(reformatDate(val));
	        	})
	        	ctrl.experience = data;
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
		function reformatDate(value){
			if(value.start)
				value.start = new Date(value.start);
			if(value.end)
				value.end = new Date(value.end);
			return value;
		}
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
	    	ctrl.experience.push(angular.copy(dummyDocument));
	    }
	    ctrl.save = function(data){
	    	var data = reformatDate(data);
	    	if(data._id){
	    		appService.put(ctrl.url.db, data).then(
		    		function(response){
		    			var data = [];
			        	angular.forEach(response.data, function (val, key){
			        		data.push(reformatDate(val));
			        	})
		    			ctrl.experience = data;
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
		    			var data = [];
			        	angular.forEach(response.data, function (val, key){
			        		data.push(reformatDate(val));
			        	})
		    			ctrl.experience = data;
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
	    	var data = reformatDate(data);
	    	if(data._id){
	    		appService.delete(ctrl.url.db, data).then(
		    		function(response){
		    			var data = [];
			        	angular.forEach(response.data, function (val, key){
			        		data.push(reformatDate(val));
			        	})
		    			ctrl.experience = data;
		    			alert("Data deleted successfully.");
		    			//logService.success('appService.delete()', response);
		    		},function(err){
		    			alert("Error : Data delete!");
		    			logService.failed('appService.delete()', err);
		    		}
	    		);
	    	}else{
	    		var index = ctrl.experience.indexOf(data);
	    		ctrl.experience.splice(index, 1);
	    	}
	    }
	}
})