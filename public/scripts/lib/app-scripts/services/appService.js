define(function(){

var app = angular.module("coreModule");

app.factory('appService', ['$http', function($http){
	return {
		get : function(url){
			return $http.get(url);
		},
		getQuery : function(url, id){
			return $http.get(url +'/'+ id);
		},
		post : function(url, data){
			return $http.post(url, data);
		},
		put : function(url, data){
			return $http.put(url, data);
		},
		delete: function(url, data) {
			var config = {
			    method: "DELETE",
			    url: url,
			    data: data,
			    headers: {"Content-Type": "application/json;charset=utf-8"}
			};

			return $http(config);
        } 
	};
}])

});