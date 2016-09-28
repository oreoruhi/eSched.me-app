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
  modalScope.project = project;

  function init() {
 //   console.log($cookieStore.get('userId'));
 //   userId = $cookieStore.get('userId');
    ModuleService.getProjectModules(project.id)
      .then(function(result) {
        moduleCtrl.
      });

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

  modalScope.newModule = function(id, name, desc, percentage, difficulty, start, end) {
    ModuleService.newModule(id, name, desc, percentage, difficulty, start, end)
      .then(function(result) {
        console.log(result.data);
      });
  }

  init();
  angular.extend(modalScope, moduleCtrl);
  //modalScope.userId = userId;
}
