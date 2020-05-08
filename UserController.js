(function() {

    var app = angular.module('githubViewer');
  
    var UserController = function($scope, github, $routeParams) {
        
      var onUserComplete = function(data) {
        $scope.user = data;
        $scope.error = '';
        github.getRepos($scope.user)
          .then(onRepos, onError);
      };
  
      var onRepos = function(data){
        $scope.user.repos = data;
      }
  
      var onError = function(reason) {
        $scope.error = 'WHOOPSIE!! Could not fetch the data';
      };
      
      $scope.username = $routeParams.username;
      $scope.repoSortOrder = "-stargazers_count";
      github.getUser($scope.username).then(onUserComplete, onError);
  
    };
  
    // Register your controllers in the module
    app.controller('UserController', UserController);
  
  })();
  