/**
 * 409 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(err);
 * return res.serverError(err, 'some/specific/error/view');
 * return invalid email error if mail is already taken
 */

module.exports = function emailAddressInUse () {

  //send response if email is already taken
  var res = this.res;
  return res.send(409,'Email address is already taken');
};
