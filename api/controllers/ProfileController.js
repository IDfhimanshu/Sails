/**
 * ProfileController
 *
 * @description :: Server-side logic for managing Profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    //if user is not logged in redirect to homepage
    index: function(req, res) {
      // If not logged in, show the public view.
      // if (!req.session.me) {
      //   return res.view('homepage');
      // }

      // Otherwise, look up the logged-in user and show the logged-in view,
      // bootstrapping basic user data in the HTML sent from the server
      Users.findOne({
        username: req.param('any')
      }).exec(function(err, user) {
        if (err) {
          return res.negotiate(err);
        }
        if (!user) {
          return res.view('404');
        }
        if (!req.session.me && user) {
          var notloggedIn = {
            data : user,
            status : 'not logged in'
          }
          	return res.json(notloggedIn);
        } else {
          return res.json(user);
        }
      });
		},
    };
