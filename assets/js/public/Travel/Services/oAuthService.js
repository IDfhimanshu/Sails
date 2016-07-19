'use strict';

//function for authentication of user
app.factory('oAuthService', function($rootScope,cookieService) {

  return {
    //check id cookie storage is there or not
    check: function(key) {
      var sess = cookieService.get(key);
      if (sess) {
        return $rootScope.logged = true;
      } else {
        $rootScope.logged = false;
      }
    }
  };
});
