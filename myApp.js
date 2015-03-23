angular.module('ticTacToe', [])
  .controller('TicTacToeCtrl', function($scope) {
    $scope.dimensions = [1, 2, 3]
    $scope.game = []
    $scope.players = ["X", "O"];
    $scope.winner = null;

    $scope.setClicked = function(){
      $scope.class = "clicked";
    }

    $scope.moves = 0;

    $scope.updateMoves = function(position){
      if ($scope.moves == 9) return;
      $scope.moves++;
      $scope.game[position] =  $scope.players[$scope.moves%2];

      if ($scope.checkWin() == true) {
        $scope.winner = $scope.game[position];
        console.log($scope.players[$scope.moves%2]);
      }
    }

    $scope.checkWin = function(){
      game = $scope.game
      return  (compare(game[0], game[1], game[2]) ||
              compare(game[3], game[4], game[5]) ||
              compare(game[6], game[7], game[8]) ||
              compare(game[0], game[3], game[6]) ||
              compare(game[1], game[4], game[7]) ||
              compare(game[2], game[5], game[8]) ||
              compare(game[0], game[4], game[8]) ||
              compare(game[2], game[4], game[6]));
    }

    $scope.gameOver = function() {
      return ($scope.moves >= 9 &&  $scope.checkWin != true);
    }

    var compare = function(a, b, c) {
      return a == b && b == c && a != null
    }
  });
