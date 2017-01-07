define(function(){
	var app = angular.module("coreModule");
	app.directive("fileuploadDirective", ["Upload","$window","$timeout","logService","appService", function(Upload, $window, $timeout, logService, appService){
		return{
			restrict : "AE",

			scope : {
				"data" : "=",
				"url" : "@",
				"path" : "@",
			},

			template : "<div class='dropBox' ngf-drop ngf-select ng-model='files'"+
            "ngf-drag-over-class='dragover' ngf-multiple='true' ngf-allow-dir='true'"+
            "accept={{accept}} ngf-pattern={{pattern}}><img ng-src={{image}}>"+
            "<div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div>"+
            "<span class='uploadProgress' ng-show='showProgress'><h4 class='font-light'>{{progressPercentage}}%</h4></span></div>",

			link : function (scope, element, attrs) {
				angular.element(element).ready(function(){
					scope.$watch('data', function(value){
						if(angular.isObject(scope.data)){
							scope.image = scope.data.image;
						}else{
							scope.image = scope.data;
						}
					});
					var dir = "";
					if(scope.data.name){
						dir = angular.copy(scope.data.name);
					}
					scope.files = "";
					scope.file = "";
					scope.accept = "image/*,application/pdf";
					scope.pattern = "'image/*,application/pdf'";
					scope.progressPercentage = 0;
					scope.showProgress = false;
					scope.$watch(function () {
			            return scope.files;
			        }, function(value){
			            scope.upload(value);
			        });

			        scope.$watch('file', function () {
			            return scope.file;
			        }, function(value){
			            if (value != null) {
			                scope.files = [value]; 
			            }
			        });

			        scope.log = '';

			        scope.upload = function (files, data) {
			            if (files && files.length) {
			                for (var i = 0; i < files.length; i++) {
			                    var file = files[i];
			                    if (!file.$error) {
			                        Upload.upload({
			                            url: scope.url, //webAPI exposed to upload the file,
			                            data: {
			                            	file: file,
			                                name: file.name,
			                                dir: dir
			                            }
			                        }).then(function (resp) {

			                            $timeout(function() {
			                            	
			                                var log = 'file: ' +
			                                resp.config.data.file.name +
			                                ', Response: ' + JSON.stringify(resp.data) ;
			                                scope.image = scope.path + resp.config.data.file.name;
			                                //Assign new value to data
			                                if(angular.isObject(scope.data)){
												scope.data.image = scope.image;
											}else{
												scope.data = scope.image;
											}
			                                //Add a flag to notify the image changed and is unsaved
			                                scope.data.imgUnSaved = true;
			                            });
			                        }, function (resp) {
			                        	alert("File upload error : "+ resp.status);
							            console.log('Error: ' + resp);
							        }, function (evt) {
			                            scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            							//console.log('progress: ' + scope.progressPercentage + '% ' + evt.config.data.file.name);
            							if(scope.progressPercentage === 100){
            								scope.showProgress = false;
            							}else{
            								scope.showProgress = true;
            							}
			                        });
			                    }
			                }
			            }
			        }
				});
			}
		}
	}]);
});