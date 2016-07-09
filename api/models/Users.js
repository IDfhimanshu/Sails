/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'local_mysql',
	autoCreatedAt: false,
	autoUpdatedAt: false,
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
      type:'email',
      required:true,
      unique:true
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
    date_added:{
      type: 'datetime',
      defaultsTo: function() {return new Date();}
    },
    date_modified:{
      type: 'datetime',
      defaultsTo: function() {return new Date();}
    }
  }
};
