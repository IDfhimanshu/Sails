/**
 * Email Configuration
 * (sails.config.emails)
 *
 * Configure which email id will send the email and set smtp if needed
 * Created by Himanshu Gupta
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.email.html
 */

//email config to send email
module.exports.email = {
 service: "Gmail",
 auth: {
 user: "hayhimanshu009@gmail.com",
 pass: "himanshu@1993"
 },
 templateDir: "views/emailTemplates",
 from: "hayhimanshu009@gmail.com",
 testMode: false    //set test mode false in order to send email
}
