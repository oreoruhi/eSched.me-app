angular.module('eSchedMe')
  .controller('ModuleCtrl', ModuleCtrlFunction)
  .controller('ModuleModalCtrl', ModalCtrlFunction);

function ModuleCtrlFunction(
  appModalService,
  appPopoverService,
  ModuleData,
  $stateParams,
  $state,
  $ionicHistory,
  API,
  _
  ) {

  var vm = this;

  init();


  function init() {
    vm.maxPercentage = 100;
    vm.availablePercentage = 100;
    console.log("Initializing Module Controller.");
    console.log($stateParams.project);
    console.log($stateParams.module);
    vm.project = $stateParams.project;
    vm.modules = $stateParams.module;
    console.log(vm.modules);
    _.each(vm.modules, function(obj) {
      obj.end = new Date(obj.end).toISOString();
      obj.start = new Date(obj.start).toISOString();
      console.log(obj.percentage);
      vm.availablePercentage -= obj.percentage;
    });
    vm.user = JSON.parse(window.localStorage.getItem('user'));
  }


  function refreshPercentage() {
    vm.availablePercentage = 100;
    _.each(vm.modules, function(obj) {
      console.log(vm.availablePercentage);
      vm.availablePercentage -= obj.percentage;
      console.log(vm.availablePercentage);
    });
  }

  vm.createModule = function () {
    vm.project.availablePercentage = vm.availablePercentage;
    console.log(vm.availablePercentage);
    appModalService.show('templates/modals/module/create-module.html', 'ModuleModalCtrl as vm', vm.project)
      .then(function (result) {
        if(result) {
          vm.modules = _.union(vm.modules, [result]);
          refreshPercentage();
        }
      });
  };

  vm.showOptions = function ($event, module) {
    console.log('clicked');
    appPopoverService.show('templates/events/module-popover.html', 'ModuleModalCtrl as vm', $event, module)
      .then(function (result) {
        if(!result) return;
        if(result.message === "Module Deleted!") {
          vm.modules = _.reject(vm.modules, function (el) {
            return el.id == result.module.data.id;
          });
          refreshPercentage();
        }
      });
  }

}

function  ModalCtrlFunction(ModuleData, parameters, appModalService, $state, $scope) {
  // parameters is the project for this module
  var vm = this;

  vm.edit = parameters;
  if(parameters.availablePercentage) vm.availablePercentage = parameters.availablePercentage;
  if(!parameters.user) $scope.end = parameters.end;
  vm.editModule = function () {
    appModalService.show('templates/modals/module/edit-module.html', 'ModuleModalCtrl as vm', parameters)
      .then(function (result) {
        if (!result) {
          vm.closePopover();
          $state.reload();
        } else {
          vm.closePopover();
        }
      });
  };

  vm.updateModule = function (end) {
    vm.edit.end = end;
    ModuleData.update({module: parameters.id}, vm.edit,
    function (resp,header) {
      vm.closeModal(resp);
    },
    function (error) {
      console.log(error)
    });

  };

  vm.deleteModule = function () {
    ModuleData.delete({module: parameters.id},
      function (resp,header) {
        console.log(resp);
        vm.closePopover(resp);
      },
      function (error) {
        console.log(error);
      });
  };

  vm.saveModule = function (start, end) {
    ModuleData.save({
      'activity_id': parameters.id,
      'title': vm.modal.name,
      'percentage': vm.modal.percentage,
      'description': vm.modal.description,
      'risk': vm.modal.risk,
      'start': start,
      'end': end,
      'status': 'ongoing',
      'priority': vm.modal.priority
    }, function (resp, headers) {
      console.log(resp);
      vm.closeModal(resp);
    }, function (error) {
      console.log(error);
    });
  };
}
 