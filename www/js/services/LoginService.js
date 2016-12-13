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

    .service('LoginService', function ($q, API, $http, $cordovaFacebook, $state) {
        var service = this;


        service.signin = function (email, password) {
            //call Backand for sign in
            return $http.post(API.URL + '/auth/login', {
              "email": email,
              "password": password
            });
        };

        service.signout = function (user) {
          if(user.fuid) {
            $cordovaFacebook.logout().then(
            function( success ) {
              console.log(success);
              $http.defaults.headers.common['Authorization'] = 'Bearer ' + '';
              $state.go('login');
            }, function(error) {
              console.log(error);
            });
          } else {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + '';
              $state.go('login');
          }
        };
    });
