const Gameboard = require("./gameboard");
const Player = require("./player");


const GameLoop = (playerCoordinates) => {
  const setRandomComputerCoordinates = () => {
    const alignmentOptions = ["vertical", "horizontal"];
    const randomNumber = (max) => Math.floor(Math.random() * max);
    let randomX = () => randomNumber(10);
    let randomY = () => randomNumber(10);
    let randomAlignment = () => alignmentOptions[randomNumber(2)];
    let coordinatesChosen = [];
    let occupiedCoordinates = [];

    function getCoordinates() {
      for (let i = 0; i < 5; i++) {
        let coordinates = {
          x: randomX(),
          y: randomY(),
          alignment: randomAlignment(),
          position: i,
        };
        coordinatesChosen.push(coordinates);
        if (coordinates.alignment === "horizontal") {
          for (let j = 0; j <= i; j++) {
            let coordinateX = coordinates.x;
            let coordinateY = coordinates.y;
            coordinateX += j;
            let elementToFind = `{x: ${coordinateX}, y: ${coordinateY}}`;
            if (
              coordinateX < 10 &&
              occupiedCoordinates.includes(elementToFind) !== true
            ) {
              occupiedCoordinates.push(
                `{x: ${coordinateX}, y: ${coordinateY}}`
              );
            }
          }
        } else {
          for (let j = 0; j <= i; j++) {
            let coordinateX = coordinates.x;
            let coordinateY = coordinates.y;
            coordinateY += j;
            let elementToFind = `{x: ${coordinateX}, y: ${coordinateY}}`;
            if (
              coordinateY < 10 &&
              occupiedCoordinates.includes(elementToFind) !== true
            ) {
              occupiedCoordinates.push(
                `{x: ${coordinateX}, y: ${coordinateY}}`
              );
            }
          }
        }
      }
    }
    do {
      occupiedCoordinates = [];
      coordinatesChosen = [];
      getCoordinates();
    } while (occupiedCoordinates.length !== 15);

    if (occupiedCoordinates.length === 15) {
      return coordinatesChosen;
    }
  };

  let computerCoordinates = setRandomComputerCoordinates();
  //const playerCoordinates = playerCoordinates;
  //let screen = ScreenController


  const computerGameboard = Gameboard(
    computerCoordinates[0],
    computerCoordinates[1],
    computerCoordinates[2],
    computerCoordinates[3],
    computerCoordinates[4]
  );

  

  const playerGameboard = Gameboard(
    playerCoordinates[0],
    playerCoordinates[1],
    playerCoordinates[2],
    playerCoordinates[3],
    playerCoordinates[4]
  );

  const getPlayerGameboard = () => {
    return playerGameboard.grid;
  };

  const getComputerGameboard = () => {
    return computerGameboard.grid;
  };

  const humanPlayer = Player("human", computerGameboard);
  const computerPlayer = Player("computer", playerGameboard);
  const players = [humanPlayer, computerPlayer];

  let currentPlayer = players[0];

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const playRound = (x, y) => {
    if (currentPlayer === players[0]) {
      humanPlayer.playerAttack(x, y);
      if (computerGameboard.isFleetSunk() === true) {
        console.log("loop player won")
        return "player won"
      } else {
        switchPlayer();
        computerPlayer.computerAttack();      
        if (playerGameboard.isFleetSunk() === true) {
          console.log("computer won")
        return "computer won"
      } else {
        switchPlayer();
        console.log("loop continue")
        return "continue"
      }
      }

    }
  };

  return {
    getPlayerGameboard,
    getComputerGameboard,
    getCurrentPlayer,
    playRound,
    setRandomComputerCoordinates,
    computerCoordinates,
  };
};

export default GameLoop;
