angular.module('ticTacToe', [])
  .controller('TicTacToeCtrl', function($scope) {
    $scope.canvas_size = 3;
    $scope.players = ["O", "X"];

    $scope.multiplayer = true

    $scope.moves = 0;
    $scope.game = [[],[],[]];
    $scope.emptyCells = [[0, 1, 2],[0, 1, 2],[0, 1, 2]]

    $scope.winners = [];
    // $scope.xScore = get;
    // $scope.oScore = 0;

    $scope.lastWinner = function(){
     if ($scope.winners.length > 0)
      return _.last($scope.winners)[0];
    }

    $scope.updateMoves = function(position1, position2){
      if ($scope.moves == 9) return;
      if ($scope.game[position1][position2] != null) return;

      updateEmptyCells(position1, position2);
      $scope.moves++;

      $scope.game[position1][position2] =  $scope.players[$scope.moves%2];

      if ($scope.checkWin() == true) {
        $scope.winners = $scope.winners.concat($scope.game[position1][position2]);
        return
      }

      if ($scope.multiplayer == false && computersMove() == true) {
        next_position = _.sample($scope.emptyCells);
        $scope.updateMoves(next_position);
      };
    }

    $scope.setComputerPlayer = function() {
      $scope.multiplayer = !$scope.multiplayer;
    }

    $scope.checkWin = function(){
      game = $scope.game
      return  (compare(game[0][0], game[0][1], game[0][2]) ||
               compare(game[1][0], game[1][1], game[1][2]) ||
               compare(game[2][0], game[2][1], game[2][2]) ||
               compare(game[0][0], game[1][0], game[2][0]) ||
               compare(game[0][1], game[1][1], game[2][1]) ||
               compare(game[0][2], game[1][2], game[2][2]) ||
               compare(game[0][0], game[1][1], game[2][2]) ||
               compare(game[0][2], game[1][1], game[2][0]));
    }


    $scope.gameStart = function(){
      return ($scope.moves == 0);
    }

    $scope.gameOver = function() {
      return ($scope.moves >= 9 &&  $scope.checkWin != true);
    }

    $scope.playAgain = function(){
      $scope.game = [[],[],[]];
      $scope.moves = 0;
      $scope.emptyCells = [[0, 1, 2],[0, 1, 2],[0, 1, 2]]
    }

    $scope.reset = function(){
      $scope.winners = [];
      $scope.playAgain();
    }

    $scope.canvasArray = function(n){
      res = []
      for (i = 1; i <= n; i++) {
          res.push(i);
      }
      return res;
    }

// Helper functions
    var updateEmptyCells = function(position1, position2){
      $scope.emptyCells[position1] = _.without($scope.emptyCells[position1], position2);
    }

    var compare = function(a, b, c) {
      return a != null && a == b && b == c
    }

    var computersMove = function(){
      return ($scope.moves % 2 != 0)
    }

    $scope.getScore = function(){
      return _.countBy($scope.winners, function(winner){
        return winner == 'X' ? 'X': 'O';
      })
    }

  });
