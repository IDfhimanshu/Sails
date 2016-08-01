/*
    Author- Himanhsu
    Date- June10, 2015
    Purpose- this file is used to check whether user is logged in or not
 */

app.factory('loginServices', function($http, $rootScope,cookieService) {
  return {
    //function to get cookie value if stored and return true else false
    is_logged: function() {
      if (cookieService.get('TSCID') && cookieService.get('TSCAT')) {
        return true;
      } else {
        return false;
      }
    },

    logout: function() {
      cookieService.destroy('TSCID');
      $rootScope.islogged = false;

    }
  }
});
