(function() {
  'use strict';

  var app = angular.module('eSchedMe')
  app.controller('SignUpCtrl', function(Backand, $state, $rootScope, LoginService, AuthService, ionicToast) {
    var self = this;

    function _init() {
      self.reset();
      self.provider = Backand.getSocialProviers();

    }

    self.socialSignIn = function(provider) {
      LoginService.socialSignIn(provider)
        .then(onLogin)
        .catch(errorHandler);
    };


    function onLogin() {
        $rootScope.$broadcast('authorized');
        $state.go('dashboard.newsfeed');
    }

    function errorHandler(error) {
      // to-do: notifier
      if(error) {
        ionicToast.show("You have entered invalid login credentials.", 'bottom', false, 2000);
      }
    }


    self.register = function(firstname, lastname, email, password, confirmPassword) {
        AuthService.signup(firstname, lastname, email, password, confirmPassword)
        .then(onSignupSuccess)
        .catch(ionicToast.show("Something went wrong while processing your request. Please try again.", 'bottom', false, 2000));
    };

    function onSignupSuccess(result) {
        //to-do: notifier
        ionicToast.show("You have successfully registered your account. Please check your email.", 'bottom', true, 2000);
        console.log(result);
    }

  });
})();
