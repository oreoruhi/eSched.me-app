angular.module('eSchedMe.controllers', [])

    .controller('LoginCtrl', function ($cordovaFacebook, $http, $state, $rootScope, $cookieStore,LoginService, ionicToast, $ionicLoading) {
        var login = this;

        function clearLogin() {
          login.email = '';
          login.password = '';
        }

        function signin() {
            $ionicLoading.show({template: '<ion-spinner>'});
            LoginService.signin(login.email, login.password)
                .then(function (result) {
                    console.log(result);
                    window.localStorage.setItem('id_token', result.data.token);
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.token;
                    onLogin();

                }, function (error) {
                    $ionicLoading.hide();
                    if(error) {
                      console.log(error);
                      ionicToast.show("You have entered invalid login credentials.", 'bottom', false, 2000);
                    }
                })

        }

        login.socialSignIn = function(provider) {
          $cordovaFacebook.login(["public_profile", "email"])
            .then(function(success) {
              $ionicLoading.show({template: '<ion-spinner>'});
              fblogin(success);
            }, function (error) {
              console.log(error);
            });
        };

        function fblogin(success) {
          $http.post( API.URL + '/auth/fblogin', success)
            .then(function(result) {
              window.localStorage.setItem('id_token', result.data.token);
              $http.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.token;
              $rootScope.$broadcast('authorized');
              $ionicLoading.hide();
              $state.go('dashboard.newsfeed');
          });
        }

        function onLogin(){
            $rootScope.$broadcast('authorized');
            login.email = '';
            login.password = '';
            $ionicLoading.hide();
            $state.go('dashboard.newsfeed');
        }

        function signout() {
            var user = JSON.parse(window.localStorage.getItem(user));
            console.log(user);
            LoginService.signout(user);
        }

        login.signin = signin;
        login.signout = signout;
    });
