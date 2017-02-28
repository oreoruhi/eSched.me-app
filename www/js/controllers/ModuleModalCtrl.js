angular.module('eSchedMe')
  .controller('ModuleModalCtrl', ModalCtrlFunction);

  function  ModalCtrlFunction(
    ModuleData,
    parameters,
    appModalService,
    $state,
    $scope,
    $ionicModal,
    $log,
    $ionicPopup,
    ProjectData,
    $http,
    API) {
  // parameters is the project for this module
  var vm = this;
  vm.module=parameters;
  vm.edit = parameters;
  if(parameters.availablePercentage) {
    $log.warn(parameters.availablePercentage);
    vm.availablePercentage = parameters.availablePercentage;
    vm.modal = {};
    vm.modal.percentage = vm.availablePercentage;
    var startDate;
  };
  if(!parameters.user) {
      $scope.end = new Date(parameters.end);
      $scope.start = new Date(parameters.start);
  }
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

  vm.tagPeople = function (module) {
    console.log(module);
    ProjectData.get({project: module.activty_id}, function (resp, header) {
      console.log(resp);
      console.log(module.tagged.data)
      $scope.allTagged = resp.data.tagged.data;
      $ionicModal
        .fromTemplateUrl('templates/modals/module/tag-people.html', function (modal) {
          $scope.module = module;
          $scope.tagged = filterFriends($scope.allTagged, module.tagged.data);
          $scope.module.start = new Date(module.start);
          $scope.module.end = new Date(module.end);
          $scope.closeModal = vm.closeModal;
          $scope.addTag = vm.addTag;
          $scope.unTag = vm.unTag;
          vm.modal = modal;
          vm.modal.show();
        }, {
          scope: $scope,
          animation: 'fade-in-scale'
        });
    });
  };

  vm.addTag = function (module_id, user_id) {
    $http({
      method: 'POST',
      url: API.URL + '/api/v1/module/' + module_id + '/tag',
      data: {
        "user_id": user_id
      }
    }).then(function (result) {
      $scope.module = result.data.module.data;
      $scope.tagged = filterFriends($scope.tagged, $scope.module.tagged.data);
      console.log(result);
    })
  };

  vm.unTag = function (module_id, user_id) {
    $http({
      method: 'POST',
      url: API.URL + '/api/v1/module/' + module_id + '/untag',
      data: {
        "user_id": user_id
      }
    }).then(function (result) {
      console.log(result);
      $scope.module = result.data.module.data;
      $scope.tagged = filterFriends($scope.allTagged, $scope.module.tagged.data);
    })
  };

  vm.closeModal = function () {
    vm.modal.hide();
  };

  vm.updateModule = function (start, end) {
    vm.edit.start = start;
    vm.edit.end = end;
    vm.edit.status = "ongoing";
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
    if(end.getTime() < start.getTime()) {
      $ionicPopup.alert({
        title: "Invalid End Date",
        template: 'End date should be greater than Start date'
      });
      return;
    }
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

  function filterFriends(friends, tagged) {
    var taggedId = {};

    tagged.forEach(function (obj) {
      taggedId[obj.id] = obj;
    });

    return friends.filter(function (obj) {
      return !(obj.id in taggedId);
    })
  }
}
