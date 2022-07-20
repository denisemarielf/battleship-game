const Ship = (shipLength, shipX, shipY, shipAlignment) => {
  const name = "s" + shipLength;
  const length = shipLength;
  const x = shipX;
  const y = shipY;
  const alignment = shipAlignment;

  let positions = [];

  for (let i = 0; i < shipLength; i++) {
    positions.push(false);
  }

  const hit = (position) => {
    positions[position] = true;
  };

  const isSunk = () => {
    const status = positions.every((position) => {
      return position === true;
    });
    return status;
  };

  return { hit, isSunk, positions, name, length, x, y, alignment };
};

module.exports = Ship;
