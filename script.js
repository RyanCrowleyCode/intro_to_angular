(function() {
  // Create a module with a name
  var app = angular.module('githubViewer', []);

  var MainController = function($scope, $http) {
    var onUserComplete = function(response) {
      $scope.user = response.data;
      $scope.error = '';
      $http.get($scope.user.repos_url)
        .then(onRepos, onError);
    };

    var onRepos = function(response){
      $scope.user.repos = response.data;
    }

    var onError = function(reason) {
      $scope.error = 'WHOOPSIE!! Could not fetch the data';
    };

    $scope.search = function(username) {
      $http
        .get('https://api.github.com/users/' + username)
        .then(onUserComplete, onError);
    };
    
    $scope.message = 'Github Viewer';
  };

  // Register your controllers in the module
  /* 
    Due to minification, we will use an array instead of just the function
    name. The function name will go last, and the full parameter names will
    preceede as strings.
  */
  app.controller('MainController', ['$scope', '$http', MainController]);
})();
