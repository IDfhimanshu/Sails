/*
  @Autor - Himanshu gupta
  @History- July3, 2016
  ***This is user signup controller responsible for user sign up*****
 */

'use strict';

app.controller('signupCtrl', function($scope, $http,$location,$facebook,userFactory) {
  /*
    @user registration function
    @param - user
   */
  $scope.user = {};
  $scope.login = {};
  $scope.userRegistration = function(user) {
//get the user data
    $scope.data = {
      '_csrf':document.getElementById("_csrfid").value,
      'firstname' : $scope.user.firstname,
      'lastname':$scope.user.lastname,
      'signup_method':'manual',
      'email':$scope.user.email,
      'password':$scope.user.password,
      'platform':'web'
  };
  userFactory.userRegistration($scope.data)
      .then(function onSuccess(response) {
        // window.location='/users';
        console.log(response);
      })
      .catch(function onError(sailsresponse) {
        console.log(sailsresponse);
      })
      .finally(function eitherWay(){
      })
  };
  /*
    @user signin function
    @param - user login credential
   */
  $scope.signin = function(login) {

        $scope.data = {
          '_csrf' :document.getElementById("_csrfid").value,
          'email' : $scope.login.email,
          'password':$scope.login.password
      };
    //send login request to service
    userFactory.userLogin($scope.data)
        .then(function onSuccess(response) {
          // window.location='/users';
          console.log(response);
        })
        .catch(function onError(sailsresponse) {
          console.log(sailsresponse);
        })
        .finally(function eitherWay(){
        })
  };

    //function to login with facebook
    $scope.socialLogin = function() {
      console.log('clicked');
      $facebook.login().then(function() {
      refresh();
    },function(reason) {
        console.log('failed');
      });
  };
  function refresh() {
    $facebook.api("/me?fields=id,name,email,permissions").then(
      function(response) {
        $scope.data = {
          '_csrf':document.getElementById("_csrfid").value,
          'name' : response.name,
          'email':response.email,
          'facebook_id':response.id,
      };
      //send facebook detail to application login
      userFactory.socialLogin($scope.data)
          .then(function onSuccess(response) {
          //  console.log(response);
          })
          .catch(function onError(sailsresponse) {
            console.log(sailsresponse);
          })
      },
      function(err) {
        
      });
  }
});
