(function() {
    'use strict';

    var app = angular.module('eSchedMe');

    app.service('AuthService', ['$rootScope', '$state', AuthServiceFunction]);

    function AuthServiceFunction($rootScope, $state) {
        var vm = this;

        vm.signup = function(firstname, lastname, email, password, confirmPassword) {
            if (password === confirmPassword) {
                var passcode = new jsSHA("SHA-1", "TEXT");
                passcode.update(password);
                var hash = passcode.getHash("HEX");
            } else {
                return;
            }
        }
    }
})();
