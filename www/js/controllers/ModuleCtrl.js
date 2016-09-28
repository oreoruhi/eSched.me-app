angular.module('eSchedMe.controllers')
.controller('ModuleCtrl', ModuleCtrlFunction);

ModuleCtrlFunction.$inject = [
  '$http',
  '$rootScope',
  '$state',
  '$cookieStore',
  'ModuleService',
  '$ionicModal',
  '$scope'
];

function ModuleCtrlFunction($http, $rootScope, $state, $cookieStore, ModuleService, $ionicModal, $scope) {
  var moduleCtrl = this;
  //var userId;
  var modalScope = $rootScope.$new(true);


  function init() {
 //   console.log($cookieStore.get('userId'));
 //   userId = $cookieStore.get('userId');
  }


  moduleCtrl.openModalCreateModule = function() {
    $ionicModal.fromTemplateUrl('templates/modals/create-module.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      moduleCtrl.modal = modal;
      moduleCtrl.modal.show();
    });
  };

  modalScope.closeModal = function() {
    moduleCtrl.modal.hide();
  };


  init();
  angular.extend(modalScope, moduleCtrl);
  //modalScope.userId = userId;
}
