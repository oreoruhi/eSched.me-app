angular.module('eSchedMe')
.controller('ModuleCtrl', ModuleCtrlFunction);

ModuleCtrlFunction.$inject = [
  '$rootScope',
  '$state',
  '$cookieStore',
  'ModuleService',
  '$ionicModal',
  '$cordovaDatePicker',
  '$ionicPlatform',
  '$ionicPopover',
  '$stateParams'
];

function ModuleCtrlFunction(
  $rootScope,
  $state,
  $cookieStore,
  $ionicModal,
  $cordovaDatePicker,
  $ionicPlatform,
  $ionicPopover,
  $stateParams,
  ModuleService) {

  init();

  function init() {
    console.log("Initializing Module Controller.");
  }
}
