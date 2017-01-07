define(function(){
	var app = angular.module("coreModule");
	app.registerController("aboutController",["appService", "logService", aboutController]);
	function aboutController(appService, logService){
		//-----------------------------------------------------------------------------------------------
		//Veriables
		//-----------------------------------------------------------------------------------------------
		var ctrl = this;
		ctrl.services = [];
		ctrl.aboutData = {
			name : "",
			description : "",
            aboutImage : "/img/dummy.png",
            dob : "",
            nationality : "",
            languages : [],
            interestImage : "/img/dummy.png",
            interests : [],
            hobbyImage : "/img/dummy.png",
            hobbies : []
		}
		//-----------------------------------------------------------------------------------------------
		//Configuration
		//-----------------------------------------------------------------------------------------------
		ctrl.url = {
			db : '/api/about',
			fs : '/api/about/img'
		}
		ctrl.fsDir = '/img/about/';
		//-----------------------------------------------------------------------------------------------
		//Inetial get
		//-----------------------------------------------------------------------------------------------
		appService.get(ctrl.url.db).then(
	        function(response) {
	        	if(response.data.length > 0){
	        		ctrl.aboutData = {};
		        	ctrl.aboutData = response.data[0];
					deleteResourcesOnLoad(response.data[0]);
				}
	        }, 
	        function(err) {
	        	alert("Error : Data get!");
	            logService.failed('appService.get()', err);
	        }
	    );
	    //-----------------------------------------------------------------------------------------------
		//Helper functions
		//-----------------------------------------------------------------------------------------------
		function cleanArray(value){
	    	var arr = [];
	    	angular.forEach(value, function (val, key){
	    		if(val && val.length > 0){
	    			arr.push(val);
	    		}
	    	});
	    	return arr;
	    }
		function deleteResourcesOnLoad(value){
			var imgArr = [];
			var file = [value.aboutImage, value.interestImage, value.hobbyImage];
			file = cleanArray(file);
			angular.forEach(file, function (val, key){
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
	    ctrl.addNewLanguage = function(){
	    	ctrl.aboutData.languages.push("Add language");
	    }
	    ctrl.addNewInterest = function(){
	    	ctrl.aboutData.interests.push("Add interest");
	    }
	    ctrl.addNewHobby = function(){
	    	ctrl.aboutData.hobbies.push("Add hobby");
	    }
	    ctrl.save = function(data){
	    	data.languages = cleanArray(data.languages);
	    	data.interests = cleanArray(data.interests);
	    	data.hobbies = cleanArray(data.hobbies);
	    	console.log(data);
	    	if(data._id){
	    		appService.put(ctrl.url.db, data).then(
		    		function(response){
		    			ctrl.aboutData = {};
		    			ctrl.aboutData = response.data[0];
		    			alert("Data updated successfully.");
		    			//logService.success('appService.put()', response);
		    		},function(err){
		    			alert("Error : Data updated!");
		    			logService.failed('appService.put()', err);
		    		}
	    		);

	    	}else{
		    	appService.post(ctrl.url.db, data).then(
		    		function(response){
		    			ctrl.aboutData = {};
		    			ctrl.aboutData = response.data[0];
		    			alert("Data saved successfully.");
		    			//logService.success('appService.post()', response);
		    		},function(err){
		    			alert("Error : Data save!");
		    			logService.failed('appService.post()', err);
		    		}
	    		);
		    }
	    }  
	}
});