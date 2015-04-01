angular.module('ticTacToe', [])
  .controller('TicTacToeCtrl', function($scope) {
    $scope.settings = {
      players: ["O", "X"],
      dimensions: [1,2,3]
    }

    var empty_match = {
      board: [[],[],[]],
      lastWinner: ""
    }

    var empty_game = {
      match: angular.copy(empty_match),
      winners: []
    }

    $scope.game = angular.copy(empty_game);

    $scope.updateMoves = function(position1, position2){
      if (gameEmptyOrSameCellClicked(position1,position2)== true) return;

      $scope.game.match.board[position1][position2] =  $scope.settings.players[(numberOfMoves()+1)%2];

      if ($scope.checkWin() == true) {
        $scope.game.winners = $scope.game.winners.concat($scope.game.match.board[position1][position2]);
        $scope.game.match.lastWinner = $scope.game.match.board[position1][position2];
        return
      }
    }

    $scope.setComputerPlayer = function() {
      $scope.multiplayer = !$scope.multiplayer;
    }

    $scope.checkWin = function(){
      game = $scope.game.match.board
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
      $scope.game.match = angular.copy(empty_match);
    }

    $scope.reset = function(){
      $scope.game = angular.copy(empty_game);
    }

    $scope.getScore = function(){
      return _.countBy($scope.game.winners, function(winner){
        return winner == 'X' ? 'X': 'O';
      })
    }

// Helper functions
    var gameEmptyOrSameCellClicked = function(position1,position2){
      return (numberOfMoves() == 9) || ($scope.game.match.board[position1][position2] != null);
    }

    var compare = function(a, b, c) {
      return a != null && a == b && b == c
    }

    var numberOfMoves = function(){
      flat_game = _.flatten($scope.game.match.board);

      moves = _.countBy(flat_game, function(move){
        return _.contains(['X','O'], move) ? 'Moves' : 'Empty';
      });
      return moves['Moves'] || 0;
    }
  });
