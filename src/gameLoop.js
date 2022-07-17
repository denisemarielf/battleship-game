const Gameboard = require("./gameboard");
const Player = require("./player");

const GameLoop = () => {
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
        if (coordinates.alignment === "vertical") {
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

  const computerGameboard = Gameboard(
    computerCoordinates[0],
    computerCoordinates[1],
    computerCoordinates[2],
    computerCoordinates[3],
    computerCoordinates[4]
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
        console.log("player won");
      } else {
        switchPlayer();
        computerPlayer.computerAttack();
      }
      if (playerGameboard.isFleetSunk() === true) {
        console.log("computer won");
      } else {
        switchPlayer();
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
