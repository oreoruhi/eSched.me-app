(function() {
  'use strict';

  var app = angular.module('eSchedMe')
  app.controller('SignUpCtrl', function($cordovaFacebook, $state, $rootScope, LoginService, AuthService, ionicToast, $http, API) {
    var self = this;

    function _init() {
      self.reset();

    }

    self.socialSignIn = function(provider) {
      $cordovaFacebook.login(["public_profile", "email"])
        .then(function(success) {
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
          $state.go('dashboard.newsfeed');
      });
    }


    function onLogin(result) {
        console.log(result);
        $rootScope.$broadcast('authorized');
        $state.go('dashboard.newsfeed');
    }

    function errorHandler(error) {
      // to-do: notifier
      console.log(error);
      if(error) {
        // WAG PAPALITAN YUNG MESSAGE! PAG PRODUCTION NALANG
        ionicToast.show(error.error_description, 'bottom', false, 2000);
      }
    }


    self.register = function(firstname, lastname, email, password, confirmPassword) {
        AuthService.signup(firstname, lastname, email, password, confirmPassword)
        .then(onSignupSuccess)
        .catch(errorHandler);
        // .catch(ionicToast.show("Something went wrong while processing your request. Please try again.", 'bottom', false, 2000));
    };

    function onSignupSuccess(result) {
        //to-do: notifier
        ionicToast.show("You have successfully registered your account. Please check your email.", 'bottom', true, 2000);
        console.log(result);
    }

  });
})();
