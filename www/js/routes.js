angular.module('eSchedMe')
  .config(['$stateProvider', 'API', function ($stateProvider, API, $ionicLoading) {
    $stateProvider
      .state('login', {
        // cache: false,
        url: '/',
        templateUrl: 'templates/signin.html',
        controller: 'LoginCtrl as login'
      })

      .state('signup-form', {
        url: '/signup-form',
        templateUrl: 'templates/signup-form.html',
        controller: 'SignUpCtrl as vm'
      })

      .state('dashboard', {
        // cache: false,
        url: '/dashboard',
        abstract: true,
        templateUrl: 'templates/dashboard.html',
        controller: 'DataCtrl as dataCtrl',
        data: {
          //role: 'User'
        }
      })

      .state('dashboard.newsfeed', {
        url: '/newsfeed',
        views: {
          'menuContent': {
            templateUrl: 'templates/newsfeed.html'
          }
        }
      })

      .state('dashboard.tags', {
        url: '/tags',
        views: {
          'menuContent': {
            templateUrl: 'templates/tag-requests.html'
          }
        }
      })

      .state('dashboard.profile', {
        cache: false,
        url: '/profile',
        views: {
          'menuContent': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileCtrl as profile'
          }
        },
        resolve: {
          user: function($http, $ionicLoading) {
            $ionicLoading.show({template: '<ion-spinner>'});
            return $http({
              method: 'GET',
              url: API.URL + '/api/v1/me'
            });
          }
        }
      })
      .state('dashboard.otheruser', {
        url: '/user/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/other-users.html'
          }
        }
      })

      .state('dashboard.project', {
        cache: false,
        url: '/project',
        views: {
          'menuContent': {
            templateUrl: 'templates/project.html',
            controller: 'ProjectCtrl as vm'
          }
        }
      })

      .state('dashboard.module', {
        cache: false,
        url: '/module',
        views: {
          'menuContent': {
            templateUrl: 'templates/module.html',
            controller: 'ModuleCtrl as vm'
          }
        },
        params: {
          project: null,
          module: null
        }
      })

      .state('dashboard.submodule', {
        cache: false,
        url: '/submodule/:module_id',
        views: {
          'menuContent': {
            templateUrl: 'templates/submodule.html',
            controller: 'SubmoduleCtrl as ctrl',
          }
        },
        resolve: {
          module: ['ModuleData', '$stateParams', function(ModuleData, $stateParams) {
            return ModuleData.get({module: $stateParams.module_id}).$promise;
          }]
        }
      })

      .state('dashboard.timeline', {
        url: '/timeline',
        views: {
          'menuContent': {
            controller: 'MapCtrl',
            templateUrl: 'templates/timeline.html'
          }
        }
      })

      .state('dashboard.direction', {
        url: '/direction',
        cache: false,
        views: {
          'menuContent': {
            controller: 'DirectionsCtrl as vm',
            templateUrl: 'templates/meeting-view.html'
          }
        },
        params: {
          meeting: null
        }
      })

      .state('dashboard.meeting', {
        url: '/meeting',
        views: {
          'menuContent': {
            controller: 'MeetingCtrl as vm',
            templateUrl: 'templates/meetings.html'
          }
        },
        params: {
          project: null
        }
      })

      .state('dashboard.friend', {
        cache: false,
        url: '/friend',
        views: {
          'menuContent': {
            templateUrl: 'templates/friend.html',
            controller: 'FriendCtrl as friend'
          }
        },
        resolve: {
          requests: function ($http) {
            return $http({
              method: 'GET',
              url: API.URL + '/api/v1/me/requests'
            });
          },
          friends: function ($http) {
            return $http({
              method: 'GET',
              url: API.URL + '/api/v1/me/friends'
            });
          }
        }
      })

      .state('dashboard.inbox', {
        // cache: false,
        url: '/inbox',
        views: {
          'menuContent': {
            templateUrl: 'templates/inbox.html',
            controller: 'InboxCtrl as vm'
          }
        }
      })

      .state('dashboard.chat', {
        // cache: false,
        url: '/chat/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl as vm'
          }
        },
        resolve: {
          requests: function ($http, $stateParams) {
            return $http({
              method: 'GET',
              url: API.URL + '/api/v1/me/messages/' + $stateParams.id
            });
          },
        }
      })

      .state('dashboard.groupchat', {
        // cache: false,
        url: '/groupchat',
        views: {
          'menuContent': {
            templateUrl: 'templates/chat-detail-group.html'
          }
        }
      });
  }]);
