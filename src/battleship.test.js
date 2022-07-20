import Ship from "./ship-factory";
import Gameboard from "./gameboard";
import Player from "./player";

describe("Ship factory", () => {
  let intactShip = Ship(5, 0, 3, "vertical");
  let shipHitInPosition3 = Ship(3, 3, 5, "horizontal");
  let sunkShip = Ship(1, 9, 6, "vertical");
  sunkShip.hit(0);
  shipHitInPosition3.hit(2);
  it("has the correct amount of positions", () => {
    expect(intactShip.positions).toEqual([false, false, false, false, false]);
  });
  it("marks the correct position as hit", () => {
    expect(shipHitInPosition3.positions).toEqual([false, false, true]);
  });
  it("detects when a ship is sunk", () => {
    expect(sunkShip.isSunk()).toEqual(true);
  });
  it("detects when a ship is not sunk", () => {
    expect(intactShip.isSunk()).toEqual(false);
  });
  it("has the correct coordinates", () => {
    expect(intactShip.y).toEqual(3);
    expect(intactShip.x).toEqual(0);
  });
  it("displays the correct name", () => {
    expect(shipHitInPosition3.name).toEqual("s3");
  });
  it("displays the correct alignment", () => {
    expect(shipHitInPosition3.alignment).toEqual("horizontal");
  });
});

describe("Gameboard factory", () => {
  const gameboard1 = Gameboard(
    { x: 5, y: 3, alignment: "horizontal" },
    { x: 1, y: 3, alignment: "vertical" },
    { x: 3, y: 8, alignment: "horizontal" },
    { x: 7, y: 6, alignment: "vertical" },
    { x: 4, y: 1, alignment: "horizontal" }
  );
  const gameboard2 = Gameboard(
    { x: 5, y: 3, alignment: "horizontal" },
    { x: 1, y: 3, alignment: "vertical" },
    { x: 3, y: 8, alignment: "horizontal" },
    { x: 7, y: 6, alignment: "vertical" },
    { x: 4, y: 1, alignment: "horizontal" }
  );

  const expectedAvaliablePositions = [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 },
    { x: 0, y: 5 },
    { x: 0, y: 6 },
    { x: 0, y: 7 },
    { x: 0, y: 8 },
    { x: 0, y: 9 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 1, y: 4 },
    { x: 1, y: 5 },
    { x: 1, y: 6 },
    { x: 1, y: 7 },
    { x: 1, y: 8 },
    { x: 1, y: 9 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 2, y: 3 },
    { x: 2, y: 4 },
    { x: 2, y: 5 },
    { x: 2, y: 6 },
    { x: 2, y: 7 },
    { x: 2, y: 8 },
    { x: 2, y: 9 },
    { x: 3, y: 0 },
    { x: 3, y: 1 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
    { x: 3, y: 4 },
    { x: 3, y: 5 },
    { x: 3, y: 6 },
    { x: 3, y: 7 },
    { x: 3, y: 8 },
    { x: 3, y: 9 },
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 4, y: 2 },
    { x: 4, y: 3 },
    { x: 4, y: 4 },
    { x: 4, y: 5 },
    { x: 4, y: 6 },
    { x: 4, y: 7 },
    { x: 4, y: 8 },
    { x: 4, y: 9 },
    { x: 5, y: 0 },
    { x: 5, y: 1 },
    { x: 5, y: 2 },
    { x: 5, y: 3 },
    { x: 5, y: 4 },
    { x: 5, y: 5 },
    { x: 5, y: 6 },
    { x: 5, y: 7 },
    { x: 5, y: 8 },
    { x: 5, y: 9 },
    { x: 6, y: 0 },
    { x: 6, y: 1 },
    { x: 6, y: 2 },
    { x: 6, y: 3 },
    { x: 6, y: 4 },
    { x: 6, y: 5 },
    { x: 6, y: 6 },
    { x: 6, y: 7 },
    { x: 6, y: 8 },
    { x: 6, y: 9 },
    { x: 7, y: 0 },
    { x: 7, y: 1 },
    { x: 7, y: 2 },
    { x: 7, y: 3 },
    { x: 7, y: 4 },
    { x: 7, y: 5 },
    { x: 7, y: 6 },
    { x: 7, y: 7 },
    { x: 7, y: 8 },
    { x: 7, y: 9 },
    { x: 8, y: 0 },
    { x: 8, y: 1 },
    { x: 8, y: 2 },
    { x: 8, y: 3 },
    { x: 8, y: 4 },
    { x: 8, y: 5 },
    { x: 8, y: 6 },
    { x: 8, y: 7 },
    { x: 8, y: 8 },
    { x: 8, y: 9 },
    { x: 9, y: 0 },
    { x: 9, y: 1 },
    { x: 9, y: 2 },
    { x: 9, y: 3 },
    { x: 9, y: 4 },
    { x: 9, y: 5 },
    { x: 9, y: 6 },
    { x: 9, y: 7 },
    { x: 9, y: 8 },
    { x: 9, y: 9 },
  ];

  const expectedGrid = [
    [null, null, null, null, null, null, null, null, null, null],
    [
      null,
      null,
      null,
      { ship: "s2", position: 0 },
      { ship: "s2", position: 1 },
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null, null, null, null, null],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      { ship: "s3", position: 0 },
      null,
    ],
    [
      null,
      { ship: "s5", position: 0 },
      null,
      null,
      null,
      null,
      null,
      null,
      { ship: "s3", position: 1 },
      null,
    ],
    [
      null,
      { ship: "s5", position: 1 },
      null,
      { ship: "s1", position: 0 },
      null,
      null,
      null,
      null,
      { ship: "s3", position: 2 },
      null,
    ],
    [
      null,
      { ship: "s5", position: 2 },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      { ship: "s5", position: 3 },
      null,
      null,
      null,
      null,
      { ship: "s4", position: 0 },
      { ship: "s4", position: 1 },
      { ship: "s4", position: 2 },
      { ship: "s4", position: 3 },
    ],
    [
      null,
      { ship: "s5", position: 4 },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  const expectedGrid2 = [
    [null, null, null, null, null, null, null, null, null, null],
    [
      null,
      null,
      null,
      { ship: "s2", position: 0 },
      { ship: "s2", position: 1 },
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null, null, null, null, null],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      { ship: "s3", position: 0 },
      null,
    ],
    [
      null,
      true,
      null,
      null,
      null,
      null,
      null,
      null,
      { ship: "s3", position: 1 },
      null,
    ],
    [
      null,
      { ship: "s5", position: 1 },
      null,
      { ship: "s1", position: 0 },
      null,
      null,
      null,
      null,
      { ship: "s3", position: 2 },
      null,
    ],
    [
      null,
      { ship: "s5", position: 2 },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      { ship: "s5", position: 3 },
      null,
      null,
      null,
      null,
      { ship: "s4", position: 0 },
      { ship: "s4", position: 1 },
      { ship: "s4", position: 2 },
      { ship: "s4", position: 3 },
    ],
    [
      null,
      { ship: "s5", position: 4 },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  const expectedGrid3 = [
    [false, null, null, null, null, null, null, null, null, null],
    [
      null,
      null,
      null,
      { ship: "s2", position: 0 },
      { ship: "s2", position: 1 },
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null, null, null, null, null],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      { ship: "s3", position: 0 },
      null,
    ],
    [
      null,
      true,
      null,
      null,
      null,
      null,
      null,
      null,
      { ship: "s3", position: 1 },
      null,
    ],
    [
      null,
      { ship: "s5", position: 1 },
      null,
      { ship: "s1", position: 0 },
      null,
      null,
      null,
      null,
      { ship: "s3", position: 2 },
      null,
    ],
    [
      null,
      { ship: "s5", position: 2 },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      { ship: "s5", position: 3 },
      null,
      null,
      null,
      null,
      { ship: "s4", position: 0 },
      { ship: "s4", position: 1 },
      { ship: "s4", position: 2 },
      { ship: "s4", position: 3 },
    ],
    [
      null,
      { ship: "s5", position: 4 },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  it("displays the correct grid", () => {
    expect(gameboard1.grid).toEqual(expectedGrid);
  });
  it("displays correctly a successful attack", () => {
    gameboard1.receiveAttack(4, 1);
    expect(gameboard1.grid).toEqual(expectedGrid2);
  });
  it("displays correctly a missed attack", () => {
    gameboard1.receiveAttack(0, 0);
    expect(gameboard1.grid).toEqual(expectedGrid3);
  });
  it("detects when all ships are NOT sunk", () => {
    expect(gameboard1.isFleetSunk()).toEqual(false);
  });
  it("detects when all ships are sunk", () => {
    gameboard1.receiveAttack(5, 3);
    gameboard1.receiveAttack(1, 3);
    gameboard1.receiveAttack(1, 4);
    gameboard1.receiveAttack(3, 8);
    gameboard1.receiveAttack(4, 8);
    gameboard1.receiveAttack(5, 8);
    gameboard1.receiveAttack(7, 6);
    gameboard1.receiveAttack(7, 7);
    gameboard1.receiveAttack(7, 8);
    gameboard1.receiveAttack(7, 9);
    gameboard1.receiveAttack(4, 1);
    gameboard1.receiveAttack(5, 1);
    gameboard1.receiveAttack(6, 1);
    gameboard1.receiveAttack(7, 1);
    gameboard1.receiveAttack(8, 1);
    gameboard1.receiveAttack(9, 1);
    expect(gameboard1.isFleetSunk()).toEqual(true);
  });
  it("returns the correct avaliable coordinates ", () => {
    gameboard2.receiveAttack(0, 0);
    expect(gameboard2.avaliableCoordinates()).toEqual(
      expectedAvaliablePositions
    );
  });
});

describe("Computer Player", () => {
  it("computer hits the correct coordinate", () => {
    const humanGameboard = Gameboard(
      { x: 5, y: 3, alignment: "horizontal" },
      { x: 1, y: 3, alignment: "vertical" },
      { x: 3, y: 8, alignment: "horizontal" },
      { x: 7, y: 6, alignment: "vertical" },
      { x: 4, y: 1, alignment: "horizontal" }
    );
    let computerPlayer = Player("computer", humanGameboard);
    let selectedCoordinates = computerPlayer.computerAttack();

    if (
      humanGameboard.grid[selectedCoordinates.x][selectedCoordinates.y] === true
    ) {
      expect(
        humanGameboard.grid[selectedCoordinates.x][selectedCoordinates.y]
      ).toBe(true);
    } else {
      expect(
        humanGameboard.grid[selectedCoordinates.x][selectedCoordinates.y]
      ).toBe(false);
    }
  });
});

describe("Human Player", () => {
  const computerGameboard = Gameboard(
    { x: 5, y: 3, alignment: "horizontal" },
    { x: 1, y: 3, alignment: "vertical" },
    { x: 3, y: 8, alignment: "horizontal" },
    { x: 7, y: 6, alignment: "vertical" },
    { x: 4, y: 1, alignment: "horizontal" }
  );
  let humanPlayer = Player("human", computerGameboard);
  it("player hits the correct coordinate", () => {
    humanPlayer.playerAttack(0, 0);
    humanPlayer.playerAttack(1, 3);
    expect(computerGameboard.grid[0][0]).toBe(false);
    expect(computerGameboard.grid[1][3]).toBe(true);
  });
});
