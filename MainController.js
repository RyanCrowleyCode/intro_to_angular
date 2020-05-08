(function() {

    var app = angular.module("githubViewer");
  
    var MainController = function(
      $scope, $interval, $location) {
        
      var decrementCountdown = function(){
        $scope.countdown -= 1;
        if ($scope.countdown < 1) {
          $scope.countdownMessage = "Too slow!";
          $scope.countdown = null;
        }
      };
  
      var countdownInterval = null;
      var startCountdown = function() {
        countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
      };
  
      $scope.search = function(username) {
        if (countdownInterval) {
          $interval.cancel(countdownInterval);
          $scope.countdown = null;
          if ($scope.countdownMessage != "Too slow!") {
            $scope.countdownMessage = "Way to go, Gunslinger!";
          }
        }
        $location.path("/user/" + username);
      };
      
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
    // app.controller('MainController', ['$scope', '$interval', '$location', MainController]);
  })();
  