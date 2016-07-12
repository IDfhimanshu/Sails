//service for generating user name property

app.service('usernameProperty', function() {
    this.myFunc = function (x) {
        return x.toString(16);
    }
});
