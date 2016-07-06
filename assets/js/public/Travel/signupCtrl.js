/*
  @Autor - Himanshu gupta
  @History- July3, 2016
  ***This is user signup controller responsible for user sign up*****
 */

'use strict';

app.controller('signupCtrl', function($scope, $http,$location) {
  /*
    @user registration function
    @param - user
   */
  $scope.user = {};
  $scope.userRegistration = function(user) {
    console.log($scope.user);
    $http({
        url: '/signup',
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        data: {
          'firstname' : $scope.user.firstname,
          'lastname':$scope.user.lastname,
          'email':$scope.user.email,
          'password':$scope.user.password
      }
    })
      .then(function onSuccess() {
        window.location='/users';
      })
      .catch(function onError(sailsresponse) {
        console.log(sailsresponse);
      })
      .finally(function eitherWay(){
      })
  };
  $http.get('/anotherData')
    .then(function(response) {
        console.log(response);
    });
});
