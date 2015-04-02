angular.module('ticTacToe', [])
  .factory('Game', function(Settings){
    var export_ = {
      match: Settings.emptyMatch(),
      winners: [],
      resetMatch: function(){
        export_.match = Settings.emptyMatch()
      },
      resetGame: function(){
        export_.resetMatch();
        export_.winners = [];
      }
    }
    return export_
  })
  .controller('TicTacToeCtrl', function($scope, Settings, Game) {
    $scope.settings = Settings;
    $scope.game = Game;

    $scope.updateMoves = function(position1, position2){
      if (gameEmptyOrSameCellClicked(position1,position2)== true) return;

      Game.match.board[position1][position2] =  Settings.players[(numberOfMoves()+1)%2];

      if ($scope.checkWin() == true) {
        Game.winners = Game.winners.concat(Game.match.board[position1][position2]);
        Game.match.lastWinner = Game.match.board[position1][position2];
        return
      }
    }

    $scope.setComputerPlayer = function() {
      $scope.multiplayer = !$scope.multiplayer;
    }

    $scope.checkWin = function(){
      game = Game.match.board
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

    $scope.getScore = function(){
      return _.countBy(Game.winners, function(winner){
        return winner == 'X' ? 'X': 'O';
      })
    }

// Helper functions
    var gameEmptyOrSameCellClicked = function(position1,position2){
      return (numberOfMoves() == 9) || (Game.match.board[position1][position2] != null);
    }

    var compare = function(a, b, c) {
      return a != null && a == b && b == c
    }

    var numberOfMoves = function(){
      flat_game = _.flatten(Game.match.board);

      moves = _.countBy(flat_game, function(move){
        return _.contains(['X','O'], move) ? 'Moves' : 'Empty';
      });
      return moves['Moves'] || 0;
    }
  });
