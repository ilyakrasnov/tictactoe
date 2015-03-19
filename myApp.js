angular.module('ticTacToe', [])
  .controller('TicTacToeCtrl', function($scope) {
    $scope.dimensions = [1, 2, 3]
    $scope.setClicked = function(){
      $scope.class = "clicked";
    }
    $scope.moves = 0;

    $scope.updateMoves = function(){
      $scope.moves++;
    }

    $scope.firstPlayer = function(){
        return $scope.moves % 2 == 1;
    }

  });
