/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //function to show dashboard of user
  userProfile : function (req,callback){

//if user is not logged in the return to home page
    if(!req.session.me){
      return callback.view('/');
    }

  };
}
