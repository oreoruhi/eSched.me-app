(function() {
    'use strict';

    var app = angular.module('SimpleRESTIonic');

    app.service('AuthService', ['Backand', '$rootScope', '$state', AuthServiceFunction]);

    function AuthServiceFunction(Backand, $rootScope, $state) {
        var vm = this;
        
        vm.signup = function(firstname, lastname, email, password, confirmPassword) {
            if (password === confirmPassword) {
                var passcode = new jsSHA("SHA-1", "TEXT");
                passcode.update(password);
                var hash = passcode.getHash("HEX");
                return Backand.signup(firstname, lastname, email, password, confirmPassword, {"password": hash});
            } else {
                return;
            }
        }
    }
})();