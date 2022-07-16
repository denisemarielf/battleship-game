import GameLoop from "./gameLoop";

export default function ScreenController() {
    const playerGrid = document.querySelector(".main-game-container-player");
    const computerGrid = document.querySelector(".main-game-container-computer");
    
    const game = GameLoop();
  
    const updateScreen = () => {
      // clear the board
      computerGrid.textContent = "";
      playerGrid.textContent = ""
 
      // get the newest version of the board and player turn
      const playerBoard = game.getPlayerGameboard();
      const computerBoard = game.getComputerGameboard()
     /*  const activePlayer = game.getActivePlayer();
  
      // Display player's turn
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`*/
  
      // Render board squares
      const renderBoard = (board, domGrid) => {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
              let gridItem = document.createElement("button");
              gridItem.dataset.column = j
              gridItem.dataset.row = i
              if(board[j][i] !== true && board[j][i] !== false) {
                gridItem.style.background = "white"
              }else if (board[j][i]) {
                gridItem.style.background = "green"
              }else {
                gridItem.style.background ="blue"
              }
              domGrid.appendChild(gridItem);
            }
          }
      }

      renderBoard(playerBoard, playerGrid)
      renderBoard(computerBoard, computerGrid)

    }
  
    // Add event listener for the board
    function clickHandlerBoard(e) {
      const x = e.target.dataset.column;
      const y = e.target.dataset.row;
      // Make sure I've clicked a column and not the gaps in between
      console.log(x,y)
      game.playRound(x, y);
      
      updateScreen();
    }

    computerGrid.addEventListener("click", clickHandlerBoard);
  
    // Initial render
    updateScreen();
  
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }
