define(['jquery', 'foundation'], function ($, Foundation) {
	var app = angular.module("coreModule");
	app.directive("projectdetailDirective", ["appService", function (appService) {
		return {
			restrict: 'E',
			scope : {
				project : "="
			},
			templateUrl : "/views/homeViews/projectdetail.html",
			link: function (scope, element, attrs) {
				angular.element(element).ready(function(){
					scope.learnMore = false;
					scope.projectSub = [];
					scope.toggle = function(){
						if(scope.projectSub.length === 0){
							appService.getQuery("/api/portfolio/sub", scope.project._id).then(
								function (response){
									scope.projectSub = response.data;
								},function (err){
									logService.failed('appService.get()', err);
								}
							);
						}
						scope.learnMore = !scope.learnMore;
					}
				});
			}
		};
	}])
})