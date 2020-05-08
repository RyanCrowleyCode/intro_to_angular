(function() {
  // Create a module with a name
  var app = angular.module('githubViewer', []);

  var MainController = function(
    $scope, github, $interval, $log, $anchorScroll, $location) {
      
    var onUserComplete = function(data) {
      $scope.user = data;
      $scope.error = '';
      github.getRepos($scope.user)
        .then(onRepos, onError);
    };

    var onRepos = function(data){
      $scope.user.repos = data;
      $location.hash("userDetails");
      $anchorScroll();
    }

    var onError = function(reason) {
      $scope.error = 'WHOOPSIE!! Could not fetch the data';
    };

    var decrementCountdown = function(){
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
        $scope.countdownMessage = "Too slow!";
      }
    };

    var countdownInterval = null;
    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.search = function(username) {
      $log.info("Searching for " + username)
      github.getUser(username).then(onUserComplete, onError);
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
        if ($scope.countdownMessage != "Too slow!") {
          $scope.countdownMessage = "Way to go, Gunslinger!";
        }
      }
    };
    
    $scope.message = 'Github Viewer';
    $scope.repoSortOrder = "-stargazers_count";
    $scope.countdown = 5;
    $scope.countdownMessage = "Can you beat the timer?";
    startCountdown();
    

  };

  // Register your controllers in the module
  app.controller('MainController', MainController);
  /* 
    Due to minification, we can use an array instead of just the function
    name. The function name will go last, and the full parameter names will
    preceede as strings.
  */
  // app.controller('MainController', ['$scope', 'github', '$interval', '$log', '$anchorScroll', '$location', MainController]);
})();
