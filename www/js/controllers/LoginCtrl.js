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
                      console.log(error);
                      ionicToast.show("You have entered invalid login credentials.", 'bottom', false, 2000);
                    }
                })
        }

        function onLogin(){
            $rootScope.$broadcast('authorized');
            login.email = '';
            login.password = '';
            $state.go('dashboard.newsfeed');
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

