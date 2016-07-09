/**
* Userauth.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection: 'local_mysql',
	tableName: 'users',
	autoCreatedAt: false,
	autoUpdatedAt: false,
  //function to generate username
  //@param - username
  //@return unique username
	generateUserName : function(data,callback) {
		try{
      //if no iteration then select blank Otherwise increament by one
        var generated = data.iteration > 0 ? (data.firstname+data.iteration) : data.firstname;
        //get if username alreay exists
        Users.count({username:generated}).
        exec(function CountUsername(err, count){
        if (err) {
          return callback(err);
        }
        if(count>0){
          data.iteration++;
          UserDetail.generateUserName(data,callback);
        }
        else{
          return callback(null,generated);
        }
      });
		} catch (ex){
			return callback(new Error(ex.message), '0');
		}
	}
};
