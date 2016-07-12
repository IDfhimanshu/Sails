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
    //
    console.log(req.params.all());
    return;
    var UserFirstName = GenerateUserProperty.GenerateFirstName(req.param('firstname'), ' ', 0);
    //function to generate unique user name
    Users.generateUserName({
      firstname: UserFirstName,
      lastname: req.param('lastname'),
      iteration: 0
    }, function Generatedname(err, UserName) {
      if (err) {
        var invalid_username = {
          success: false,
          code: 202,
          message: 'Something went wrong, Please try again later'
        };
        return res.negotiate(invalid_username);
      }
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
          var auth_token = GenerateUserProperty.GenerateAuth(30);
          //generate verify code
          var verifyCode = GenerateUserProperty.GenerateAuth(30);
          Users.create({
            first_name: UserFirstName,
            last_name: req.param('lastname'),
            email: req.param('email'),
            password: encryptedPassword,
            auth_token: auth_token,
            username: UserName,
            verify_code: verifyCode,
            verified: false,
            platform: req.param('platform'),
            facebook_id: req.param('facebook_id'),
            signup_method: req.param('signup_method')
          }, function userCreated(err, newUser) {
            if (err) {

              // If this is a uniqueness error about the email attribute,
              // send back an easily parseable status code.
              // if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
              //   && err.invalidAttributes.email[0].rule === 'unique') {
              //   return res.emailAddressInUse();
              // }

              // Otherwise, send back something reasonable as our error response.
              if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0].rule === 'unique') {
                return res.emailAddressInUse();
              } else {
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
  },

  // //function for user login
  login: function(req, res) {

    Users.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      if (err) {
        return res.negotiate(err);
      }
      if (!user) {
        var invalid_password = {
          success: false,
          code: 203,
          message: 'No user exists for this email'
        };
        return res.negotiate(invalid_password);
      }
      //bycrypt the user password
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.password
      }).exec({
        error: function(err) {
          return res.negotiate(err);
        },
        incorrect: function() {
          var invalid_password = {
            success: false,
            code: 203,
            message: 'Invalid Email password combination'
          };
          return res.negotiate(invalid_password);
        },
        success: function() {
          req.session.me = user.id;
          return res.ok();
        }
      });
    });
  },

  //function for social login
  socialLogin: function(req, res) {

    //first check if user exists with this email or not
    Users.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
         var firstname = GenerateUserProperty.GenerateFirstName(req.param('name'), ' ', 0);
         var lastname = GenerateUserProperty.GenerateFirstName(req.param('name'), ' ', 1);
        //generate a random password
          var password = GenerateUserProperty.GenerateAuth(7);
        //get the user data to register a user
          req._csrf =  req.param('_csrf');
          req.firstname = firstname;
          req.lastname = lastname;
          req.email =  req.param('email');
          req.password = password;
          req.platform = 'web';
          req.facebook_id =  req.param('facebook_id');
          req.signup_method =  'facebook';
        // register user, call itself above register method
        sails.controllers.users.signup(req, res);
      }
      //if user exists the return
      else if(user){
          req.session.me = user.id;
          return res.ok();
    }
    else{

    }
    });
  }
};
