define(['jquery', 'foundation'], function($, Foundation){

var app = angular.module("coreModule");
app.directive("dashboardDirective", ['$timeout', function($timeout){
	return{
		restrict : "A",
		link : function (scope, element, attrs) {
			$timeout(function(){
				angular.element(element).ready(function(){
					var windowWidth = $(window).innerWidth();
					var windowHeight = $(window).innerHeight();
					angular.element(element).foundation();

					//-----------------------------------------------------------------------------------------------
					//Close open dropdown
					//-----------------------------------------------------------------------------------------------
				    $(".is-dropdown-submenu-parent").click(function(event){
				    	setTimeout(function(){
					    	if($(".is-dropdown-submenu").hasClass("js-dropdown-active")){
					    		$(".is-dropdown-submenu").removeClass("js-dropdown-active");
					    	}else{
					    		$(".is-dropdown-submenu").addClass("js-dropdown-active");
					    	}
					    }, 50);
				    });
				    //-----------------------------------------------------------------------------------------------
				    //Text area auto resizing
				    //-----------------------------------------------------------------------------------------------
					$.each($('textarea[data-autoresize]'), function() {
					    var offset = this.offsetHeight - this.clientHeight;
					    var resizeTextarea = function(el) {
					        $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
					    };
					    $(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
					});
				});
			});
		}
	}
}]);

});