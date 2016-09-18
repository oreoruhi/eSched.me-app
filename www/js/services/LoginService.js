angular.module('SimpleRESTIonic.services', [])

    .service('APIInterceptor', function ($rootScope, $q) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
    })

    .service('LoginService', function (Backand, $q) {
        var service = this;


        service.signin = function (email, password, appName) {
            //call Backand for sign in
            return Backand.signin(email, password);
        };

        service.socialSignIn = function(provider) {
          return Backand.socialSignIn(provider);
        }

        service.signout = function () {
            return Backand.signout();
        };
    });
