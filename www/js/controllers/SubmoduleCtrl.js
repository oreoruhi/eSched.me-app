angular.module('eSchedMe')
  .controller('SubmoduleCtrl', controllerFunction);

function controllerFunction($stateParams, $rootScope, ModuleService, $log, SubmoduleService, $ionicModal) {
  var self = this;
  var modalScope = $rootScope.$new(true);


  function _init() {
    $log.info('Initializing Submodule Controller');
    ModuleService.getModuleById($stateParams.id)
      .then(function (result) {
        self.module = result.data;
        modalScope.remainingPercentage = self.module.percentage;
        SubmoduleService.getSubmodules(self.module.id)
          .then(function(result) {
            $log.info(result);
            self.module.submodules = result.data.data;
            self.module.submodules.forEach(function(submodule) {
              modalScope.remainingPercentage -= submodule.percentage;
              self.remainingPercentage = modalScope.remainingPercentage;
            });
          });
      });
    angular.extend(modalScope, self);
  }

  self.createSubmoduleModal = function() {
    $ionicModal.fromTemplateUrl('templates/modals/submodule/create-submodule.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      self.modal = modal;
      self.modal.show();
    });
  };

  self.closeModal = function() {
    self.modal.hide();
  };

  self.createNewSubmodule = function(name, description, percentage) {
    SubmoduleService.newSubmodule($stateParams.id, name, description, percentage)
      .then(function (result) {
        $log.info(result);
        _init();
        self.modal.hide();
      });
  };

  self.editSubmoduleModal = function(id) {
    $ionicModal.fromTemplateUrl('templates/modals/submodule/edit-submodule.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      SubmoduleService.getSubmoduleById(id)
        .then(function(result) {
          modalScope.data = result.data
          console.log(result);
          self.modal = modal;
          modal.show();
        });
    });
  }

  modalScope.editSubmodule = function(id, title, description) {
    SubmoduleService.editSubmodule(id, title, description)
      .then(function() {
        self.modal.hide();
        _init();
      });
  }



  _init();
}
