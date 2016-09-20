angular.module('eSchedMe.controllers', [])

    .controller('LoginCtrl', function (Backand, $state, $rootScope, LoginService, ionicToast) {
        var login = this;

        function clearLogin() {
          login.email = '';
          login.password = '';
        }

        function signin() {
            LoginService.signin(login.email, login.password)
                .then(function (result) {
                    console.log(result);
                    onLogin();

                }, function (error) {
                    if(error) {
                      clearLogin();
                      ionicToast.show(error.error_description, 'top', false, 1500);
                    }
                })
        }

        function onLogin(){
            $rootScope.$broadcast('authorized');
            login.email = '';
            login.password = '';
            $state.go('dashboard');
        }

        function signout() {
            LoginService.signout()
                .then(function () {
                    login.email = '';
                    login.password = '';
                    $rootScope.$broadcast('logout');
                    $state.go('login');
                })

        }

        login.signin = signin;
        login.signout = signout;
    });

