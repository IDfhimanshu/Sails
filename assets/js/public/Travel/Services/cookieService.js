'use strict';

//Service to set get and destroy value from cookies
app.factory('cookieService', ['$http','$cookies', function($http,$cookies){
	return{
    //function to set value in cookies
		set:function(key,value){
			return $cookies.put(key,value);
		},
    //to get value from cookies
		get:function(key){
			return $cookies.get(key);
		},
    //destroy cookies
		destroy:function(key){
			return $cookies.remove(key);
		}
	};
}])
