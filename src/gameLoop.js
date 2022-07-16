const Gameboard = require("./gameboard");
const Player = require("./player");

const GameLoop = () => {

  const computerGameboard = Gameboard(
    { x: 5, y: 3, alignment: "vertical" },
    { x: 1, y: 3, alignment: "horizontal" },
    { x: 3, y: 8, alignment: "vertical" },
    { x: 7, y: 6, alignment: "horizontal" },
    { x: 4, y: 1, alignment: "vertical" }

  );
  const playerGameboard = Gameboard(
    { x: 6, y: 4, alignment: "vertical" },
    { x: 0, y: 5, alignment: "horizontal" },
    { x: 2, y: 8, alignment: "vertical" },
    { x: 9, y: 3, alignment: "horizontal" },
    { x: 5, y: 1, alignment: "vertical" }
  );

  const getPlayerGameboard = () => {
    return playerGameboard.grid;
  }

  const getComputerGameboard = () => {
    return computerGameboard.grid;
  }

    const humanPlayer = Player("human", computerGameboard)
    const computerPlayer = Player("computer", playerGameboard)
    const players = [humanPlayer, computerPlayer]

    let currentPlayer = players[0]

    const switchPlayer = () => {
       currentPlayer = currentPlayer === players[0] ? players[1] : players[0]
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const playRound = (x, y) => {
        if(currentPlayer === players[0]){
          humanPlayer.playerAttack(x, y) 
          if(computerGameboard.isFleetSunk() === true) {
            console.log("player won")
          }else {
            switchPlayer()
            computerPlayer.computerAttack()
          }
          if(playerGameboard.isFleetSunk() === true){
            console.log("computer won")
          }else {
            switchPlayer()
          }
          
        }
    }

  return {getPlayerGameboard, getComputerGameboard, getCurrentPlayer, playRound};
};

export default GameLoop;
