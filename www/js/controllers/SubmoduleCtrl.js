angular.module('eSchedMe')
  .controller('SubmoduleCtrl', controllerFunction);

function controllerFunction($stateParams, $rootScope, ModuleData, $log, SubmoduleService, $ionicModal, module, $state, _) {
  var self = this;
  var modalScope = $rootScope.$new(true);


  function _init() {
    $log.info('Initializing Submodule Controller');
    self.module = module.data;
    self.maxPercentage = self.module.percentage;
    self.availablePercentage = self.maxPercentage;
    _.each(self.module.submodules.data, function(obj) {
      self.availablePercentage -= obj.percentage;
      console.log(obj.percentage);
    });
    console.log(self.availablePercentage)
    console.log(self.module);
  }

  self.createSubmoduleModal = function() {
    modalScope.availablePercentage = self.availablePercentage;
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
    SubmoduleService.save({
      'module_id': self.module.id,
      'title': name,
      'description': description,
      'percentage': percentage,
      'status': 'ongoing'
    }, function(resp, header) {
      console.log(resp);
      if(resp.submodule) {
        self.closeModal();
        $state.reload();
      }
    }, function(error){
      console.log(error);
    });
  };

  self.editSubmoduleModal = function(submodule) {
    $ionicModal.fromTemplateUrl('templates/modals/submodule/edit-submodule.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
        modalScope.data = submodule;
        console.log(modalScope.data);
        self.modal = modal;
        modal.show();
    });
  }

  self.deleteSubmodule = function(id) {
    console.log(id);
    SubmoduleService.delete({submodule: id},
    function(resp, header) {
      if(resp.submodule) {
        $state.reload();
      }
    },
    function(error) {
      console.log(error);
    });
  }

  modalScope.editSubmodule = function(id, title, description) {
    SubmoduleService.update({submodule: id}, {
      'title': title,
      'description': description
    }, function(resp, header) {
      if(resp.submodule) {
        modalScope.closeModal();
        $state.reload();
      }
    }, function(error) {
      console.log(error);
    })
  }

  modalScope.closeModal = self.closeModal;
  modalScope.createNewSubmodule = self.createNewSubmodule;



  _init();
}
