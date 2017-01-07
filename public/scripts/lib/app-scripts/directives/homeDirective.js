define(['jquery', 'jquery-as-pie-progress', 'flexslider', 'foundation'], function($, asPieProgress, flexslider){

var app = angular.module("coreModule");
app.directive('homeDirective', ['$timeout' , function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			angular.element(element).ready(function(){
				angular.element(element).foundation();
				scope.$watch(
					function () { return (element.html()).length;},
					function (newValue, oldValue) {
						if (newValue !== oldValue) {
							$timeout(function(){
								var windowWidth = $(window).innerWidth();
								var windowHeight = $(window).innerHeight();
								var skillSlideParent = $("#skills .slides");
								var skillSlideChild = skillSlideParent.children();
								var skillControlParent = $(".skills-flexslider-controls");
								var skillControl = skillControlParent.children();
								var aboutSliderControlsParent = $(".about-accordian");
								var aboutSliderControls = $(".about-accordian").children("li");

								
								//-----------------------------------------------------------------------------------------------
								//Update skill slider buttons
								//-----------------------------------------------------------------------------------------------
								function updateBtn(){
									var index  = skillSlideParent.children(".flex-active-slide").index();
									for(var i = 0; i < skillSlideChild.length ; i++){
										var child;
										if(i === (index-1)){
											child = skillControl[i];
											$(child).find(".button").addClass("button-active");
										}else{
											child = skillControl[i];
											$(child).find(".button").removeClass("button-active");
										}
									}
								}
								//-----------------------------------------------------------------------------------------------
								//PieProgress init
								//-----------------------------------------------------------------------------------------------
								
								$.asPieProgress.setDefaults({
									speed : 10,
									barcolor: 'rgb(40,47,53)',
									barsize: '8',
									trackcolor: 'rgba(255,255,255,0.1)',
								});
								angular.element(element).find('.pie_progress').asPieProgress({
							        namespace: 'pie_progress'
								});
								angular.element(element).find('.pie_progress').asPieProgress('start');
								//-----------------------------------------------------------------------------------------------
								//FlexScroll init
								//-----------------------------------------------------------------------------------------------
						  		function initSlider(){
							  		$('.about-flexslider').flexslider({
										animation: "slide",              //String: Select your animation type, "fade" or "slide"
										easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
										direction: "vertical",        //String: Select the sliding direction, "horizontal" or "vertical"
										reverse: false,                 //{NEW} Boolean: Reverse the animation direction
										animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
										smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode  
										startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
										slideshow: false,                //Boolean: Animate slider automatically
										slideshowSpeed: 4000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
										animationSpeed: 1000,            //Integer: Set the speed of animations, in milliseconds
										initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
										randomize: false,               //Boolean: Randomize slide order

										// Usability features
										pauseOnAction: false,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
										pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
										useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
										touch: false,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices

										// Primary Controls
										controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
										directionNav: false,             //Boolean: Create navigation for previous/next navigation? (true/false)
										prevText: "Previous",           //String: Set the text for the "previous" directionNav item
										nextText: "Next",               //String: Set the text for the "next" directionNav item

										// Secondary Navigation
										keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
										multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
										mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
										pausePlay: false,               //Boolean: Create pause/play dynamic element
										pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
										playText: 'Play',               //String: Set the text for the "play" pausePlay item

										// Special properties
										controlsContainer: "",          //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
										manualControls: "",             //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
										sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
										asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

										// Carousel Options
										itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
										itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
										minItems: 0,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
										maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
										move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
										                                
										// Callback API
										start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
										before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
										after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
										end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
										added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
										removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
								    });
								    $('.skills-flexslider').flexslider({
										animation: "slide",              //String: Select your animation type, "fade" or "slide"
										easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
										direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
										reverse: false,                 //{NEW} Boolean: Reverse the animation direction
										animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
										smoothHeight: true,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode  
										startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
										slideshow: true,                //Boolean: Animate slider automatically
										slideshowSpeed: 5000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
										animationSpeed: 1500,            //Integer: Set the speed of animations, in milliseconds
										initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
										randomize: false,               //Boolean: Randomize slide order

										// Usability features
										pauseOnAction: false,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
										pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
										useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
										touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices

										// Primary Controls
										controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
										directionNav: false,             //Boolean: Create navigation for previous/next navigation? (true/false)
										prevText: "Previous",           //String: Set the text for the "previous" directionNav item
										nextText: "Next",               //String: Set the text for the "next" directionNav item

										// Secondary Navigation
										keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
										multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
										mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
										pausePlay: false,               //Boolean: Create pause/play dynamic element
										pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
										playText: 'Play',               //String: Set the text for the "play" pausePlay item

										// Special properties
										controlsContainer: "",          //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
										manualControls: ".skills-flexslider-controls div",             //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
										sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
										asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

										// Carousel Options
										itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
										itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
										minItems: 0,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
										maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
										move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
										                                
										// Callback API
										start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
										before: function(){
											if(windowWidth > 640)
												$('.pie_progress').asPieProgress('reset');
										},           //Callback: function(slider) - Fires asynchronously with each slider animation
										after: function(){
											updateBtn();
											if(windowWidth > 640)
												$('.pie_progress').asPieProgress('start');
										},            //Callback: function(slider) - Fires after each slider animation completes
										end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
										added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
										removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
								    });
									$('.hero-img-flexslider').flexslider({
										animation: "fade",              //String: Select your animation type, "fade" or "slide"
										easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
										direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
										reverse: false,                 //{NEW} Boolean: Reverse the animation direction
										animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
										smoothHeight: true,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode  
										startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
										slideshow: true,                //Boolean: Animate slider automatically
										slideshowSpeed: 4000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
										animationSpeed: 1000,            //Integer: Set the speed of animations, in milliseconds
										initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
										randomize: false,               //Boolean: Randomize slide order

										// Usability features
										pauseOnAction: false,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
										pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
										useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
										touch: false,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices

										// Primary Controls
										controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
										directionNav: false,             //Boolean: Create navigation for previous/next navigation? (true/false)
									});
									$('.hero-content-flexslider').flexslider({
										animation: "fade",              //String: Select your animation type, "fade" or "slide"
										easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
										direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
										reverse: true,                 //{NEW} Boolean: Reverse the animation direction
										animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
										smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode  
										startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
										slideshow: true,                //Boolean: Animate slider automatically
										slideshowSpeed: 4000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
										animationSpeed: 1000,            //Integer: Set the speed of animations, in milliseconds
										initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
										randomize: false,               //Boolean: Randomize slide order

										// Usability features
										pauseOnAction: false,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
										pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
										useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
										touch: false,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices

										// Primary Controls
										controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
										directionNav: false,             //Boolean: Create navigation for previous/next navigation? (true/false)
									});
								}
								initSlider();
								//-----------------------------------------------------------------------------------------------
								//Trigering about-flexslider
								//-----------------------------------------------------------------------------------------------
								for(var i = 0; i < 3; i++){
									$(aboutSliderControls[i]).click(function(){
										if(windowWidth > 640){
											var index = $(aboutSliderControlsParent).children(".is-active").index();
											$('.about-flexslider').flexslider(index);
										}
									});
								}
								//-----------------------------------------------------------------------------------------------
								//Page scroll listner
								//-----------------------------------------------------------------------------------------------
								$(window).scroll(function (event) {
								    var scrollHeight = $(window).scrollTop();
								    if(scrollHeight >= (windowHeight/2)){
								    	$("#navigation").addClass("background");
								    }else{
								    	$("#navigation").removeClass("background");
								    }
								});
								//-----------------------------------------------------------------------------------------------
								//Landing page animation
								//-----------------------------------------------------------------------------------------------
								setTimeout(function(){
									$(".landing-text").removeClass("slide-in-text");
								}, 500);
								
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
								//-----------------------------------------------------------------------------------------------
							    //Watch for DOM change
							    //-----------------------------------------------------------------------------------------------
							});
						}
					}
				)
			});
		}
	};
}])

});