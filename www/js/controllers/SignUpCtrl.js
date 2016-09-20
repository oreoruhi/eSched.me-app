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
        ionicToast.show(error.data.error_description, 'top', false, 2000);
      }
    }


    self.register = function(firstname, lastname, email, password, confirmPassword) {
        AuthService.signup(firstname, lastname, email, password, confirmPassword)
        .then(onSignupSuccess)
        .catch(errorHandler);
    };

    function onSignupSuccess(result) {
        //to-do: notifier
        ionicToast.show(result.data.message, 'top', true, 2500);
        console.log(result);
    }

  });
})();
