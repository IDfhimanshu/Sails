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
    console.log(sails.getBaseUrl());
		var Passwords = require('machinepack-passwords');
	    // Encrypt a string using the BCrypt algorithm.
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
	            Users.create({
	              firstname: req.param('firstname'),
	              lastname: req.param('lastname'),
	              email: req.param('email'),
	              encryptedPassword: encryptedPassword,
	              lastLoggedIn: new Date()
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
	      },
        getData: function (req, res) {
          return res.send("Hi there!");
        },
        anotherData: function (req, res) {
          return res.send("Hi there again!");
        }
}
