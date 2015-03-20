angular.module('ticTacToe', [])
  .controller('TicTacToeCtrl', function($scope) {
    $scope.dimensions = [1, 2, 3]
    $scope.game = [3,4,5,6,7,8,9,10,11]

    $scope.setClicked = function(){
      $scope.class = "clicked";
    }

    $scope.moves = 0;

    $scope.updateMoves = function(position){
      $scope.moves++;
      $scope.game[position] =  ["X", 0][$scope.moves%2];
      checkWin();
    }

    $scope.checkWin = function(){
      game = $scope.game
      return  (game.length != 0) &&
              (game[0] == game[1] && game[1] == game[2] ||
               game[3] == game[4] && game[4] == game[5] ||
               game[6] == game[7] && game[7] == game[8] ||
               game[0] == game[3] && game[3] == game[6] ||
               game[1] == game[4] && game[4] == game[7] ||
               game[2] == game[5] && game[5] == game[8] ||
               game[0] == game[4] && game[4] == game[8] ||
               game[2] == game[4] && game[4] == game[6]);
    }

    $scope.currentCell = 0;
    $scope.updateCurrentCell = function(){
      $scope.currentCell ++;
    }


  });
