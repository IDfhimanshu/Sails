/**
 * PlantripController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    Trip:function(req,res) {
        PersonalTrip.CreateTrip(req, function(err,tripid){

        });
    },
};