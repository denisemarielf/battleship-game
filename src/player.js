const Player = (type, opponentGameboard) => {
  if (type === "computer") {
    const computerAttack = () => {
      let avaliableCoordinatesToAttack =
        opponentGameboard.avaliableCoordinates();
      let randomCoordinate = Math.floor(
        Math.random() * avaliableCoordinatesToAttack.length
      );
      let selectedCoordinates = avaliableCoordinatesToAttack[randomCoordinate];
      opponentGameboard.receiveAttack(
        selectedCoordinates.x,
        selectedCoordinates.y
      );
      return selectedCoordinates;
    };
    return { computerAttack };
  } else {
    const playerAttack = (x, y) => {
      opponentGameboard.receiveAttack(x, y);
    };
    return { playerAttack };
  }
};

module.exports = Player;
