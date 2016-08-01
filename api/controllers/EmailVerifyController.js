/**
 * EmailVerifyController
 *
 * @description :: Server-side logic for managing Emailverifies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //function for verifying email address
  index: function(req, res) {
    //check if user exists with this code and id and having verfied 0
    //first check if user exists with this email or not
    Users.findOne({
      verify_code: req.query.ver,
      id: req.query.tuid,
    }, function foundUser(err, verify) {
      if (err) {
        return res.negotiate(err);
      }
			console.log(verify);
      if (!verify) {
        var no_user = {
          success: false,
          code: 201,
          message: 'No user found with this id and code'
        };
        return res.ok(no_user);
      }
      //if user exists but already verified
      else if (verify && verify.verified === true) {
        var already_verified = {
          success: false,
          code: 202,
          message: 'User already verified'
        };
        return res.ok(already_verified);
      } else {
        Users.update({
          id: req.query.tuid
        }, {
          verified: 1
        }).exec(function afterwards(err, updated) {
          if (err) {
            return res.negotiate(err);
          }
					console.log('Updated user having id ' + req.query.tuid);
					return res.ok();
        });
      }
    });
  }

};
