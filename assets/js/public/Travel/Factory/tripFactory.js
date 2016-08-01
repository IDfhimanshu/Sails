/*
 @Auhtor - Himanshu
 A factory responsible for all user related operation
 */

'use strict';
app.factory('tripFactory', function($http, $location,cookieService) {

    return {
        //function for logging in user through facebook
        createPersonalTrip: function(data){
            console.log(data);
            var $promise = $http.post('/plantrip',data);
            $promise.then(function onSuccess(response){
                    console.log(response);

                })
                .catch(function onError(){

                })
            return $promise;
        }
    }
});
