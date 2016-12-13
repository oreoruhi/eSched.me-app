(function() {
    'use strict';

    var app = angular.module('eSchedMe');

    app.service('AuthService', ['$rootScope', '$state', '$http', 'API', AuthServiceFunction]);

    function AuthServiceFunction($rootScope, $state, $http, API) {
        var vm = this;

        vm.signup = function(firstname, lastname, email, password, confirmPassword) {
            if (password === confirmPassword) {
                return $http.post(API.URL + '/auth/register', {
                  'email': email,
                  'first_name': firstname,
                  'last_name': lastname,
                  'password': password
                });
            } else {
                return;
            }
        }
    }
})();
