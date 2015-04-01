angular.module('ticTacToe', [])
  .controller('TicTacToeCtrl', function($scope) {
    var initial_match = {
      players: ["O", "X"],
      game: [[],[],[]],
      emptyCells: [[0, 1, 2],[0, 1, 2],[0, 1, 2]],
      lastWinner: ""
    }

    $scope.winners = [];
    $scope.canvas_size = 3;

    $scope.match = initial_match;

    $scope.game = [[],[],[]];

    $scope.multiplayer = true


    $scope.updateMoves = function(position1, position2){
      if (gameEmptyOrSameCellClicked(position1,position2)== true) return;

      $scope.game[position1][position2] =  $scope.match.players[(numberOfMoves()+1)%2];

      if ($scope.checkWin() == true) {
        $scope.winners = $scope.winners.concat($scope.game[position1][position2]);
        $scope.match.lastWinner = $scope.game[position1][position2];
        return
      }

      updateEmptyCells(position1, position2);

      if ($scope.multiplayer == false && computersMove() == true) {
        next_position = _.sample($scope.match.emptyCells);
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
      return (numberOfMoves() == 0);
    }

    $scope.gameOver = function() {
      return (numberOfMoves() >= 9 &&  $scope.checkWin != true);
    }

    $scope.playAgain = function(){
      $scope.game = [[],[],[]];
      $scope.match.emptyCells = [[0, 1, 2],[0, 1, 2],[0, 1, 2]];
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

    $scope.getScore = function(){
      return _.countBy($scope.winners, function(winner){
        return winner == 'X' ? 'X': 'O';
      })
    }

// Helper functions
    var gameEmptyOrSameCellClicked = function(position1,position2){
      return (numberOfMoves() == 9) || ($scope.game[position1][position2] != null);
    }

    var updateEmptyCells = function(position1, position2){
      $scope.match.emptyCells[position1] = _.without($scope.match.emptyCells[position1], position2);
    }

    var compare = function(a, b, c) {
      return a != null && a == b && b == c
    }

    var computersMove = function(){
      return (numberOfMoves()% 2 != 0)
    }

    var numberOfMoves = function(){
      flat_game = _.flatten($scope.game);

      moves = _.countBy(flat_game, function(move){
        return _.contains(['X','O'], move) ? 'Moves' : 'Empty';
      });
      return moves['Moves'] || 0;
    }
  });
