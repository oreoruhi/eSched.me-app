angular.module('eSchedMe')
  .config(['$stateProvider', 'API', function ($stateProvider, API) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignUpCtrl as signup'
      })

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
          user: function($http) {
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
        url: '/submodule/:id',
        controller: 'SubmoduleCtrl',
        controlerAs: 'ctrl',
        views: {
          'menuContent': {
            templateUrl: 'templates/submodule.html'
          }
        }
      })

      .state('dashboard.timeline', {
        url: '/timeline',
        controller: 'MapCtrl',
        views: {
          'menuContent': {
            templateUrl: 'templates/timeline.html'
          }
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

      .state('dashboard.notification', {
        // cache: false,
        url: '/notification',
        views: {
          'menuContent': {
            templateUrl: 'templates/notification.html'
          }
        }
      })

      .state('dashboard.inbox', {
        // cache: false,
        url: '/inbox',
        views: {
          'menuContent': {
            templateUrl: 'templates/inbox.html'
          }
        }
      })

      .state('dashboard.chat', {
        // cache: false,
        url: '/chat',
        views: {
          'menuContent': {
            templateUrl: 'templates/chat-detail.html'
          }
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
