/**
 * EmailServices
 *
 * @description :: Server-side logic for managing Emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

module.exports  =  {
sendWelcomeMail : function(req,res) {
 sails.hooks.email.send(
 "testEmail",
 {
   Name: req.first_name
 },
 {
 to: req.email,
 subject: "Welcome Email"
 },
 function(err) {console.log(err || "Mail Sent!");}
 )
 }
};
