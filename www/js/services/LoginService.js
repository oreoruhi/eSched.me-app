angular.module('eSchedMe.services', [])

    .service('APIInterceptor', function ($rootScope, $q, $http) {
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
            return $http.post('http://192.168.0.10:3000/auth/login', {
              "email": '2test@yahoo.com',
              "password": 'polki123'
            });
        };

        service.signout = function () {
            
        };
    });
