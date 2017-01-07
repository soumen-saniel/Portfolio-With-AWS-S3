require.config({

	paths : {
		'jquery' : [
			'lib/jquery'
		],

		'foundation' : 'lib/vendor/foundation',
		'what-input' : 'lib/vendor/what-input',
		'jquery-as-pie-progress' : 'lib/jquery-asPieProgress',
		'flexslider' : 'lib/jquery.flexslider-min',
		'motion-ui' : 'lib/motion-ui.min',

		'angular' : 'lib/angular/angular.min',
		'angular-route' : 'lib/angular/angular-route.min',
		'angular-ui-route' : 'lib/angular-ui-router.min',
		'angular-filter' : 'lib/angular-filter.min',
		'file-upload-shim' : 'lib/ng-file-upload-shim.min',
		'file-upload' : 'lib/ng-file-upload.min',
		'coreModule' : 'coreModule'
	},

	shim : {
		'motion-ui' : {
			deps : ['jquery']
		},
		'what-input' : {
			deps : ['jquery']
		},
		'foundation' : {
			deps : ['jquery', 'motion-ui', 'what-input']
		},
		
		'jquery-as-pie-progress' : {
			deps : ['jquery']
		},
		'flexslider' : {
			deps : ['jquery']
		},
		
		'angular' : {
			deps : ['jquery']
		},
		'angular-route' : {
			deps : ['angular']
		},
		'angular-ui-route' : {
			deps : ['angular']
		},
		'angular-filter' : {
			deps : ['angular']
		},
		'file-upload-shim' : {
			deps : ['angular']
		},
		'file-upload' : {
			deps : ['angular']
		},
		'coreModule' : {
			deps : ['angular-filter', 'angular-route' , 'angular-ui-route', 'file-upload-shim', 'file-upload']
		}
	}
});

require(['coreModule'], function(){

})