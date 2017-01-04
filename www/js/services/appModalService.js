(function () {
  'use strict';

  var serviceId = 'appModalService';
  angular.module('eSchedMe').factory(serviceId, [
    '$ionicModal', '$rootScope', '$q', '$injector', '$controller', '$ionicPlatform', '$cordovaDatePicker', 'ProjectData', appModalService
  ]);

  function appModalService($ionicModal, $rootScope, $q, $injector, $controller, $ionicPlatform, $cordovaDatePicker, ProjectData) {
    var projectData;
    return {
      show: show
    }

    function show(templateUrl, controller, parameters) {
      ProjectData.get({project: parameters.activity_id}, function (resp, header) {
        projectData = resp;
      });
      // Grab the injector and create a new scope
      var deferred = $q.defer(),
        ctrlInstance,
        modalScope = $rootScope.$new(),
        thisScopeId = modalScope.$id;
      console.log(parameters);
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: modalScope,
        animation: 'fade-in-scale'
      }).then(function (modal) {
        modalScope.modal = modal;

        modalScope.openModal = function () {
          modalScope.modal.show();
        };
        modalScope.closeModal = function (result) {
          deferred.resolve(result);
          modalScope.modal.hide();
        };
        modalScope.openDatePicker = function (provider) {
          $ionicPlatform.ready(function() {
            var projectOptions = {
              date: new Date(),
              mode: 'date',
              minDate: new Date().valueOf(),
              maxDate: new Date(projectData.data[0].end).valueOf()
            };
            $cordovaDatePicker.show(projectOptions)
              .then(function(result) {
                if(provider === 'end') modalScope.end = result;
                if(provider === 'start') modalScope.start = result;
              });
          });
        };
        modalScope.$on('modal.hidden', function (thisModal) {
          if (thisModal.currentScope) {
            var modalScopeId = thisModal.currentScope.$id;
            if (thisScopeId === modalScopeId) {
              deferred.resolve(null);
              _cleanup(thisModal.currentScope);
            }
          }
        });

        // Invoke the controller
        var locals = { '$scope': modalScope, 'parameters': parameters };
        var ctrlEval = _evalController(controller);
        ctrlInstance = $controller(controller, locals);
        if (ctrlEval.isControllerAs) {
          ctrlInstance.openModal = modalScope.openModal;
          ctrlInstance.closeModal = modalScope.closeModal;
        }

        modalScope.modal.show();

      }, function (err) {
        deferred.reject(err);
      });

      return deferred.promise;
    }

    function _cleanup(scope) {
      scope.$destroy();
      if (scope.modal) {
        scope.modal.remove();
      }
    }



    function _evalController(ctrlName) {
      var result = {
        isControllerAs: false,
        controllerName: '',
        propName: ''
      };
      var fragments = (ctrlName || '').trim().split(/\s+/);
      result.isControllerAs = fragments.length === 3 && (fragments[1] || '').toLowerCase() === 'as';
      if (result.isControllerAs) {
        result.controllerName = fragments[0];
        result.propName = fragments[2];
      } else {
        result.controllerName = ctrlName;
      }

      return result;
    }


  } // end
})();
