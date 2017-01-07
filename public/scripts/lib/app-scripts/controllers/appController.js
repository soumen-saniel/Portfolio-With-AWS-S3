define(function(){

var app = angular.module("coreModule");

app.registerController("appController", ["appService", "logService", "$state", function (appService, logService, $state){
	//-----------------------------------------------------------------------------------------------
	//Values for hero section
	//-----------------------------------------------------------------------------------------------
	var ctrl = this;
	ctrl.heroSection = {
		slides : []
	}
	appService.get('/api/hero').then(
        function(response) {
        	ctrl.heroSection = {
				slides : response.data
			}
            logService.success('appService.get()', response);
        }, 
        function(response) {
            logService.failed('appService.get()', response);
        }
    );
	//-----------------------------------------------------------------------------------------------
	//Values for services section
	//-----------------------------------------------------------------------------------------------
	ctrl.servicesSection = {
		services : []
	}
	appService.get("/api/service").then(
        function(response) {
        	ctrl.servicesSection.services = response.data;
        	logService.success('appService.get()', response);
        }, 
        function(err) {
            logService.failed('appService.get()', err);
        }
    );
	//-----------------------------------------------------------------------------------------------
	//Values for portfolio section
	//-----------------------------------------------------------------------------------------------
	ctrl.portfolioSection = {
		projects : []
	}
	appService.get("/api/portfolio/main").then(
        function(response) {
        	ctrl.portfolioSection.projects = response.data;
        	logService.success('appService.get()', response);
        }, 
        function(err) {
            logService.failed('appService.get()', err);
        }
    );
	
	//-----------------------------------------------------------------------------------------------
	//Values for about section
	//-----------------------------------------------------------------------------------------------
	ctrl.aboutSection = {
		data : []
	}
	appService.get('/api/about').then(
        function(response) {
        	ctrl.aboutSection.data = response.data[0];
        	logService.success('appService.get()', response);
        }, 
        function(err) {
            logService.failed('appService.get()', err);
        }
    );
    ctrl.openCv = function(){
    	var url = $state.href('cv');
    	console.log(url);
		window.open(url,'_blank');
    }
	//-----------------------------------------------------------------------------------------------
	//Values for skills section
	//-----------------------------------------------------------------------------------------------
	ctrl.skillsSection = {
		skills : []
	}
	appService.get('/api/skill').then(
        function(response) {
        	ctrl.skillsSection.skills = response.data;
        	logService.success('appService.get()', response);
        }, 
        function(err) {
            logService.failed('appService.get()', err);
        }
    );
	//-----------------------------------------------------------------------------------------------
	//Values for experience section
	//-----------------------------------------------------------------------------------------------
	ctrl.experienceSection = {
		experiences : []
	}
	appService.get('/api/experience').then(
        function(response) {
        	var data = [];
        	angular.forEach(response.data, function (val, key){
        		if(val.start)
					val.start = new Date(val.start);
				if(val.end)
					val.end = new Date(val.end);
        		data.push(val);
        	})
        	ctrl.experienceSection.experiences = data;
        	logService.success('appService.get()', response);
        }, 
        function(err) {
            logService.failed('appService.get()', err);
        }
    );
	//-----------------------------------------------------------------------------------------------
	//Values for contact section
	//-----------------------------------------------------------------------------------------------
	ctrl.contactSection = {
		contact : [],
		social : []
	};
	appService.get('/api/contact').then(
        function(response) {
        	if(response.data.length > 0)
        		ctrl.contactSection.contact = response.data[0];
        	logService.success('appService.get()', response);
        }, 
        function(err) {
            logService.failed('appService.get()', err);
        }
    );
    appService.get('/api/social').then(
        function(response) {
        	ctrl.contactSection.social = response.data;
        	logService.success('appService.get()', response);
        }, 
        function(err) {
            logService.failed('appService.get()', err);
        }
    );
    //-----------------------------------------------------------------------------------------------
	//Email section
	//-----------------------------------------------------------------------------------------------
	ctrl.emailData = {
		name : "",
		from_address : "",
		text_body : ""
	}
	var modal = $('#appmodal');
	ctrl.sendMail = function(){
		appService.post('/api/email', ctrl.emailData).then(
	        function(response) {
	        	if(response.status === 200){
	        		ctrl.emailData = {
						name : "",
						from_address : "",
						text_body : ""
					}
					var message = "Thanks for your mail...";
					modal.html("<p class='font-light text-center'>"+message+"</p>").foundation('open');
					setTimeout(function(){
						modal.foundation('close');
					}, 2000);
	        	}
	        	logService.success('appService.get()', response);
	        }, 
	        function(err) {
	            logService.failed('appService.get()', err);
	        }
	    );
	}
}]);

});