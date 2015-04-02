angular.module('ticTacToe')
  .factory('Settings', function(){
    var _players = ["O", "X"],
        _dimension = 3;
    var export_ = {
      players: _players,
      getDimension: function(){
        return _.range(1,_dimension+1)
      },
      emptyMatch: function(){
        return angular.copy({
          board: _.map(export_.getDimension(),function(){return []}),
          lastWinner: ""
        })
      }
    }
    return export_
  });