/*
  @Auhtor - Himanshu
  A factory responsible for all user related operation
 */

'use strict';
app.factory('userFactory', function($http, $location,cookieService) {

  return {

    //user raegistration function
    userRegistration: function(data) {

      var $promise = $http.post('/signup', data); //send data to signup sails route
        $promise.then(function onSuccess(response) {
              })
              .catch(function onError(sailsresponse) {
              })
              return $promise;
      },
      //function for logging in user
      userLogin: function(data){
          var $promise = $http.post('/login',data);
          $promise.then(function onSuccess(response){

          })
          .catch(function onError(){

          })
          return $promise;
      },
      //function for logging in user through facebook
      socialLogin: function(data){
          var $promise = $http.post('/sociallogin',data);
          $promise.then(function onSuccess(response){
            //set cookie
            cookieService.set('uuid', response.data.id);
          })
          .catch(function onError(){

          })
          return $promise;
      }
  }
});
