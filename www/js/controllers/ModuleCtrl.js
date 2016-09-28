angular.module('eSchedMe')
.controller('ModuleCtrl', ModuleCtrlFunction);

ModuleCtrlFunction.$inject = [
  '$rootScope',
  '$state',
  '$cookieStore',
  'ModuleService',
  '$ionicModal'
];

function ModuleCtrlFunction($rootScope, $state, $cookieStore, ModuleService, $ionicModal) {
  var moduleCtrl = this;
  //var userId;
  var modalScope = $rootScope.$new(true);
  var project = $state.params.project;
  $cookieStore.put('project', $state.params.project);

  function init() {
 //   console.log($cookieStore.get('userId'));
 //   userId = $cookieStore.get('userId');
    console.log("Hello!!");
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
