/*
    @Author - Himanshu
    @Date   - July9,2015
    @Purpose - this is service to generate random string for auth_token
 */

 module.exports = {
//generate auth token for user /* a random 30 character numnber
     GenerateAuth: function(req) {
       var text = "";
       var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

       for( var i=0; i < req; i++ )
           text += possible.charAt(Math.floor(Math.random() * possible.length));
           return text;
     },

     //function to get name before any special character
     GenerateFirstName: function(string,character,occurance){
       return string.split(character)[occurance];
     }
 };
