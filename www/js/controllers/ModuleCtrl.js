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
  '$ionicPopover'
];

function ModuleCtrlFunction($rootScope, $state, $cookieStore, ModuleService, $ionicModal, $cordovaDatePicker, $ionicPlatform, $ionicPopover) {
  var moduleCtrl = this;
  //var userId;
  var modalScope = $rootScope.$new(true);
  var project = $state.params.project;
  modalScope.project = project;
  moduleCtrl.project = project;
  moduleCtrl.userId = $cookieStore.get('userId');

  function init() {
    modalScope.remainingPercentage = 100;
    moduleCtrl.remainingPercentage = 100;
    ModuleService.getProjectModules(project.id)
      .then(function(result) {
        moduleCtrl.totalPercentage = 0;
        moduleCtrl.modules = result.data.data;
        console.log(result);
        moduleCtrl.modules.forEach(function (module) {
          moduleCtrl.totalPercentage += module.percentage;
          modalScope.remainingPercentage = 100 - moduleCtrl.totalPercentage;
          moduleCtrl.remainingPercentage = modalScope.remainingPercentage;
        });
      });
  }


  moduleCtrl.openModalSummaryModule = function (module) {
    modalScope.module = module;
    $ionicModal.fromTemplateUrl('templates/modals/module-summary.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function (modal) {
      moduleCtrl.modal = modal;
      moduleCtrl.modal.show();
    });
  };

  moduleCtrl.openModalCreateModule = function() {
    $ionicModal.fromTemplateUrl('templates/modals/create-module.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      moduleCtrl.modal = modal;
      moduleCtrl.modal.show();
    });
  };

  moduleCtrl.deleteModule = function (id) {
    console.log('Deleting Module: ' + id);
    ModuleService.deleteModule(id)
      .then(function (result) {
        modalScope.popover.hide();
        init();
      });
  };

  modalScope.closeModal = function() {
    moduleCtrl.modal.hide();
  };

  modalScope.openDatePicker = function (project, provider) {
    console.log(project.start);
    console.log(project.end);
    $ionicPlatform.ready(function() {
      var options = {
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date(project.start).valueOf(),
        maxDate: new Date(project.end).valueOf()
      };
      $cordovaDatePicker.show(options)
        .then(function (result) {
          if(provider === 'start') {
            modalScope.start = result;
          } else if (provider ==='end') {
            modalScope.end = result;
          }
        });
    });
  };

  modalScope.editModule = function(id) {
    $ionicModal.fromTemplateUrl('templates/modals/module/edit.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      ModuleService.getModuleById(id)
        .then(function(result) {
          result.data.start = new Date(result.data.start);
          result.data.end = new Date(result.data.end);
          modalScope.data = result.data;
          moduleCtrl.modal = modal;
          console.log(modalScope.data);
          modal.show();
        });
    });
  }

  modalScope.newModule = function(id, name, desc, percentage, priority, start, end) {
    ModuleService.newModule(id, name, desc, percentage, priority, start, end)
      .then(function(result) {
        init();
        moduleCtrl.modal.hide();
      });
  };

  modalScope.updateModule = function(id, title, priority, end, description) {
    ModuleService.updateModule(id, title, priority, end, description)
      .then(function() {
        moduleCtrl.modal.hide();
        modalScope.popover.hide();
        init();
      })
  };

  moduleCtrl.showPopoverModule = function($event, module){
    $ionicPopover.fromTemplateUrl('templates/events/module-popover.html', {
      scope: modalScope,
    }).then(function(popover) {
      modalScope.popover = popover; //???????
      modalScope.module = module;
      modalScope.popover.show($event);
    });
  };

  moduleCtrl.showSubModules = function(module) {
    $state.go('dashboard.module', {module: module}, {reload: true});
  };

  init();
  angular.extend(modalScope, moduleCtrl);
  //modalScope.userId = userId;
}
