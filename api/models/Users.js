/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
//set required attributes here
  attributes: {
    firstname:{
      type:'string',
      required:true
    },
    lastname:{
      type:'string'
    },
    email:{
      type:'email',
      required:true,
      unique:true
    },
    encryptedPassword:{
      type:'string',
      required:true
    },
    last_login:{
      type:'date',
      required:true,
      defaultsTo:new Date(0)
    }
  }
};
