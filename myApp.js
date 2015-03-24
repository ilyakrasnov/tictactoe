angular.module('ticTacToe', [])
  .controller('TicTacToeCtrl', function($scope) {
    $scope.dimensions = [1, 2, 3]
    $scope.players = ["O", "X"];

    $scope.moves = 0;
    $scope.game = []

    $scope.winners = [];
    $scope.xScore = 0;
    $scope.oScore = 0;

    $scope.lastWinner = function(){
     if ($scope.winners.length > 0)
      return _.last($scope.winners)[0];
    }

    $scope.updateMoves = function(position){
      if ($scope.moves == 9) return;
      if ($scope.game[position] != null) return;

      $scope.moves++;
      $scope.game[position] =  $scope.players[$scope.moves%2];

      if ($scope.checkWin() == true) {

        $scope.winners = $scope.winners.concat($scope.game[position].split(""));

        updateScore();
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


    $scope.gameStart = function(){
      return ($scope.moves == 0);
    }

    $scope.gameOver = function() {
      return ($scope.moves >= 9 &&  $scope.checkWin != true);
    }

    $scope.playAgain = function(){
      $scope.game = [];
      $scope.moves = 0;
      $scope.winners = [];
    }

    $scope.reset = function(){
      $scope.xScore = 0;
      $scope.oScore = 0;

      $scope.playAgain();
    }

// Helper functions

    var compare = function(a, b, c) {
      return a == b && b == c && a != null
    }

    var updateScore = function(){
      if ($scope.lastWinner() == "X"){
          $scope.xScore++;
      }else
          {$scope.oScore++;}
    }
  });
