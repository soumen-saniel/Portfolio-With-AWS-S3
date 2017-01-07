define(['jquery', 'foundation'], function ($, Foundation){
	var app = angular.module("coreModule");
	app.directive('alertDirective', [function () {

		return {
			restrict : 'AE',
			scope : {
				data : "="
			},
			template : "",
			link : function (scope, element, attrs){
				angular.element(element).ready(function(){
					
					
				});
			}
		};
	}])
})