// angular
//   .module('eSchedMe')
//   .factory('appPopoverService', [
//     '$ionicPopover', '$rootScope', '$q', '$injector', '$controller', appPopoverService
//   ]);
//
// function appPopoverService($ionicModal, $rootScope, $q, $injector, $controller) {
//   return {
//     show: show
//   };
//
//   function show(templateUrl, controller, as, parameters) {
//     $ionicPopover.fromTemplateUrl(templateUrl, {
//       scope: modalScope
//     })
//   }
// }

(function () {
  'use strict';

  var serviceId = 'appPopoverService';
  angular.module('eSchedMe').factory(serviceId, [
    '$ionicPopover', '$rootScope', '$q', '$injector', '$controller', appPopoverService
  ]);

  function appPopoverService($ionicPopover, $rootScope, $q, $injector, $controller) {

    return {
      show: show
    }

    function show(templateUrl, controller, event, parameters) {
      // Grab the injector and create a new scope
      var deferred = $q.defer(),
        ctrlInstance,
        modalScope = $rootScope.$new(),
        thisScopeId = modalScope.$id;

      $ionicPopover.fromTemplateUrl(templateUrl, {
        scope: modalScope
      }).then(function (popover) {
        modalScope.popover = popover;

        modalScope.openModal = function (event) {
          modalScope.popover.show(event);
        };
        modalScope.closeModal = function (result) {
          deferred.resolve(result);
          modalScope.popover.hide();
        };
        modalScope.$on('popover.hidden', function (thisModal) {
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
          ctrlInstance.openPopover = modalScope.openModal;
          ctrlInstance.closePopover = modalScope.closeModal;
        }

        modalScope.popover.show(event);

      }, function (err) {
        deferred.reject(err);
      });

      return deferred.promise;
    }

    function _cleanup(scope) {
      scope.$destroy();
      if (scope.popover) {
        scope.popover.remove();
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

