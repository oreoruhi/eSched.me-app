angular.module('eSchedMe.services', [])

    .service('APIInterceptor', function ($rootScope, $q, $http, API) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
    })

    .service('LoginService', function ($q, API, $http) {
        var service = this;


        service.signin = function (email, password) {
            //call Backand for sign in
            return $http.post(API.URL + '/auth/login', {
              "email": email,
              "password": password
            });
        };

        service.signout = function () {

        };
    });
