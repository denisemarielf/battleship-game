import GameLoop from "./gameLoop";

const ScreenController = () => {
  const mainGameContainer = document.querySelector(".main-game-container");
  const startGameContainer = document.querySelector(".main-modal-start-game");
  const playerGrid = document.querySelector(".main-game-container-player");
  const computerGrid = document.querySelector(".main-game-container-computer");
  const endGameModal = document.querySelector(".main-modal-end-game");
  const endGameButton = document.querySelector(".main-modal-end-game-button");

  let game;

  const updateScreen = () => {
    computerGrid.textContent = "";
    playerGrid.textContent = "";

    const playerBoard = game.getPlayerGameboard();
    const computerBoard = game.getComputerGameboard();
    const renderBoard = (type, board, domGrid) => {
      for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
          let gridItem = document.createElement("button");
          gridItem.dataset.column = j;
          gridItem.dataset.row = i;
          gridItem.className = "grid-item";

          if (
            type === "player" &&
            board[j][i] !== true &&
            board[j][i] !== false &&
            board[j][i] !== null
          ) {
            gridItem.innerHTML = "⬤";
            gridItem.dataset.status = "user-ship";
          } else {
            if (board[j][i] !== true && board[j][i] !== false) {
              gridItem.dataset.status = "free";
            } else if (board[j][i]) {
              gridItem.innerHTML = "⬤";
              gridItem.dataset.status = "hit";
            } else {
              gridItem.innerHTML = "⬤";
              gridItem.dataset.status = "miss";
            }
          }
          domGrid.appendChild(gridItem);
        }
      }
    };

    renderBoard("player", playerBoard, playerGrid);
    renderBoard("computer", computerBoard, computerGrid);
  };

  function clickHandlerBoard(e) {
    if (e.target.dataset.status === "free") {
      const x = e.target.dataset.column;
      const y = e.target.dataset.row;

      let status = game.playRound(x, y);

      if (status === "continue") {
        updateScreen();
      } else if (status === "player won") {
        updateScreen();
        endGame("player");
      } else {
        updateScreen();
        endGame("computer");
      }
    }
  }

  computerGrid.addEventListener("click", clickHandlerBoard);

  const startGameModalGrid = document.querySelector(
    ".main-modal-start-game-grid"
  );

  const grid = [];

  for (let i = 0; i < 10; i++) {
    grid[i] = [];
    for (let j = 0; j < 10; j++) {
      grid[i][j] = null;
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let gridItem = document.createElement("div");
      gridItem.dataset.column = i;
      gridItem.dataset.row = j;
      gridItem.classList.add("start-grid-item");

      startGameModalGrid.appendChild(gridItem);
    }
  }

  function handleDragStart(e) {
    this.classList.add("dragging");
  }

  function handleDragEnd(e) {
    this.classList.remove("dragging");
    this.style.position = "relative";
  }

  function handleDragOver(e) {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    this.append(draggable);
  }

  let ships = document.querySelectorAll(".ship");

  ships.forEach((ship) => {
    ship.addEventListener("dragstart", handleDragStart);
    ship.addEventListener("dragend", handleDragEnd);
    ship.addEventListener("click", (e) => {
      if (e.target.parentElement.dataset.position === "vertical") {
        e.target.parentElement.dataset.position = "horizontal";
      } else {
        e.target.parentElement.dataset.position = "vertical";
      }
    });
  });

  let gridItems = document.querySelectorAll(".start-grid-item");

  gridItems.forEach((item) => {
    item.addEventListener("dragover", handleDragOver);
  });

  function startGame(playerShips) {
    ships = document.querySelectorAll(".ship[data-type='real']");

    let correctPositioned = [];

    if (ships[0].parentElement.getAttribute("data-row") !== null) {
      ships.forEach((ship) => {
        let x = parseInt(ship.parentElement.getAttribute("data-row"));
        let y = parseInt(ship.parentElement.getAttribute("data-column"));
        let alignment = ship.getAttribute("data-position");
        let position = parseInt(ship.getAttribute("id").slice(5, 6));

        if (
          (alignment === "horizontal" && position + x > 10) ||
          (alignment === "vertical" && position + y > 10)
        ) {
          document.querySelector("small").style.display = "block";
          return;
        } else {
          correctPositioned.push({
            x: x,
            y: y,
            alignment: alignment,
            position: position,
          });
        }
      });
    } else {
      document.querySelector("small").style.display = "block";
    }
    if (correctPositioned.length === 5) {
      let sorted = correctPositioned.sort((a, b) => {
        if (a.position > b.position) {
          return 1;
        }
        if (a.position < b.position) {
          return -1;
        }
        return 0;
      });
      game = GameLoop(sorted);
      const grid = game.getPlayerGameboard();

      let coordinates = [];

      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
          if (grid[i][j] !== null) {
            coordinates.push({ x: i, y: j });
          }
        }
      }

      if (coordinates.length === 15) {
        updateScreen();

        startGameContainer.style.display = "none";
        mainGameContainer.style.display = "flex";
      } else {
        document.querySelector("small").style.display = "block";
      }
    }
  }

  function endGame(winner) {
    if (winner === "player") {
      document.querySelector(".end-game-message").innerHTML = "You won 🎉";
      document.querySelector(".main-game-container").style.position =
        "relative";
      document.querySelector(".main-modal-end-game").style.display = "flex";
    } else {
      document.querySelector(".end-game-message").innerHTML = "You lost 😪";
      document.querySelector(".main-game-container").style.position =
        "relative";
      document.querySelector(".main-modal-end-game").style.display = "flex";
    }
  }

  const startGameButton = document.querySelector(
    ".main-modal-start-game-button"
  );

  startGameButton.addEventListener("click", startGame);

  endGameButton.addEventListener("click", function () {
    endGameModal.style.display = "none";
    startGameContainer.style.display = "flex";
    mainGameContainer.style.display = "none";
    document.querySelector("small").style.display = "none";
    gridItems.forEach((item) => {
      if (item.hasChildNodes()) {
        let idContainerElement = item.firstElementChild.getAttribute("id");
        let elementContainer = document.querySelector(`.${idContainerElement}`);
        let elementContainerFirstChild = elementContainer.firstElementChild;
        item.firstElementChild.style.position = "static";
        item.firstElementChild.dataset.position = "horizontal";
        elementContainerFirstChild.after(item.firstElementChild);
      }
    });
  });
};

export default ScreenController;
