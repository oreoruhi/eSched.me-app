angular.module('eSchedMe.controllers', [])

    .controller('LoginCtrl', function ($http, $state, $rootScope, $cookieStore,LoginService, ionicToast, $ionicLoading) {
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

