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
  modalScope.remainingPercentage = 100;
  moduleCtrl.remainingPercentage = 100;
  moduleCtrl.userId = $cookieStore.get('userId');

  function init() {
 //   console.log($cookieStore.get('userId'));
 //   userId = $cookieStore.get('userId');
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

  modalScope.newModule = function(id, name, desc, percentage, difficulty, start, end) {
    ModuleService.newModule(id, name, desc, percentage, difficulty, start, end)
      .then(function(result) {
        init();
        moduleCtrl.modal.hide();
      });
  };

  moduleCtrl.showPopoverModule = function($event){
    $ionicPopover.fromTemplateUrl('templates/events/module-popover.html', {
      scope: modalScope,
    }).then(function(popover) {
      modalScope.popover = popover; //???????
      modalScope.popover.show($event);
    });
  }

  init();
  angular.extend(modalScope, moduleCtrl);
  //modalScope.userId = userId;
}
