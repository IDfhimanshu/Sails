/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /*
  		Sign up for user accounts
   */
  signup: function(req, res) {
    var uniqueUserName = '';
		var Passwords = require('machinepack-passwords');
	    // Encrypt a string using the BCrypt algorithm.
	  //get firstname from user name
      var UserFirstName = GenerateUserProperty.GenerateFirstName(req.param('firstname'),' ',0);
      //function to generate unique user name
      UserDetail.generateUserName({
        firstname: UserFirstName,
        iteration:0
      }, function Generatedname(err, UserName) {
          if (err) {
            var invalid_username = {
              success:false,
              code:202,
              message:'Something went wrong, Please try again later'
            };
            return res.negotiate(err);
          }
             uniqueUserName  = UserName;
             Passwords.encryptPassword({
               password: req.param('password'),
               difficulty: 10,
             }).exec({
               // An unexpected error occurred.
               error: function(err) {
                 return res.negotiate(err);
               },
               // OK.
               success: function(encryptedPassword) {
                   // Create a User with the params sent from
                   // the sign-up form --> signup.ejs
                    //generate a random string auth_token
                      var auth_token = GenerateUserProperty.GenerateAuth();
                      //generate verify code
                      var verifyCode = GenerateUserProperty.GenerateAuth();
                     Users.create({
                       first_name: UserFirstName,
                       last_name: req.param('lastname'),
                       email: req.param('email'),
                       password: encryptedPassword,
                        auth_token:auth_token,
                        username:uniqueUserName,
                        verify_code:verifyCode,
                        verified:false,
                        platform:req.param('platform')
                     }, function userCreated(err, newUser) {
                       if (err) {

                         // If this is a uniqueness error about the email attribute,
                         // send back an easily parseable status code.
                         // if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
                         //   && err.invalidAttributes.email[0].rule === 'unique') {
                         //   return res.emailAddressInUse();
                         // }

                         // Otherwise, send back something reasonable as our error response.
                         if(err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0].rule === 'unique'){
                         return res.emailAddressInUse();
                        }
                        else{
                          return res.negotiate(err);
                        }
                       }
                       // Send back the id of the new user
                       return res.json({
                         id: newUser.id
                       });
                     });
                   }
                 });
        });
	      }
}
