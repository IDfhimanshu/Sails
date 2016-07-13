/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
//set required attributes here
  attributes: {
    first_name:{
      type:'string',
      required:true
    },
    last_name:{
      type:'string'
    },
    email:{
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    password:{
      type:'string',
      required:true
    },
    auth_token:{
      type:'string',
      required:true
    },
    username:{
      type:'string',
      required:true,
      unique:true
    },
    gravatar_url:{
      type:'string'
    },
    verify_code:{
      type:'string'
    },
    verified:{
      type: 'boolean',
      defaultsTo : false
    },
    platform:{
      type:'string'
    },
    facebook_id:{
      type:'string'
    },
    signup_method:{
      type:'string'
    },
    date_added:{
      type: 'datetime',
      defaultsTo: function() {return new Date();}
    },
    date_modified:{
      type: 'datetime',
      defaultsTo: function() {return new Date();}
    },
    //to Json explicitily chnage into json and delete sensitive field
    toJson: function(req,res){
        var obj = this.toObject();
        delete obj._csrf;
        return obj;
    }
  },
  generateUserName : function(data,callback) {
    try{
      //if no iteration then select blank Otherwise increament by one
        var generated = data.iteration > 0 ? (data.firstname+'-'+data.lastname+data.iteration) : data.firstname+'-'+data.lastname;

        //get if username alreay exists
        Users.count({username:generated}).
        then(function onSuccess(response) {
          if (response > 0) {
            data.iteration++;
            Users.generateUserName(data,callback);
          }
        else if(response  ==  0){
          return callback(null,generated.toLowerCase());
          }
          else{
            return res.negotiate(response);
          }
        })
        .catch(function onError(sailsresponse) {
          return callback(sailsresponse);
        })
    } catch (ex){
      return callback(new Error(ex.message), '0');
    }
  }
};
