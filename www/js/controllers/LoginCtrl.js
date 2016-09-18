angular.module('SimpleRESTIonic.controllers', [])

    .controller('LoginCtrl', function (Backand, $state, $rootScope, LoginService) {
        var login = this;

        function signin() {
            LoginService.signin(login.email, login.password)
                .then(function (result) {
                    console.log(result);
                    onLogin();

                }, function (error) {
                    console.log(error)
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

