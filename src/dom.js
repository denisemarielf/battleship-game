import GameLoop from "./gameLoop";

const ScreenController = () => {

    const mainGameContainer = document.querySelector(".main-game-container")
    const startGameContainer = document.querySelector(".main-modal-start-game")
    const playerGrid = document.querySelector(".main-game-container-player");
    const computerGrid = document.querySelector(".main-game-container-computer");
    const endGameModal = document.querySelector(".main-modal-end-game");
    const playerShips = []

    let game;

  
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
      const renderBoard = (type, board, domGrid) => {
        
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
              let gridItem = document.createElement("button");
              gridItem.dataset.column = j
              gridItem.dataset.row = i

              if (type === "player" && board[j][i] !== true && board[j][i] !== false && board[j][i] !== null){
                gridItem.style.background = "black"
              } else {
                if(board[j][i] !== true && board[j][i] !== false) {
                gridItem.style.background = "white"
              }else if (board[j][i]) {
                gridItem.style.background = "green"
              }else {
                gridItem.style.background ="blue"
              }
              
              }
              domGrid.appendChild(gridItem);
          }
      }}

      renderBoard("player", playerBoard, playerGrid)
      renderBoard("computer", computerBoard, computerGrid)

    }
  
    // Add event listener for the board
    function clickHandlerBoard(e) {
      if (e.target.style.background === 'white'){
        const x = e.target.dataset.column;
        const y = e.target.dataset.row;
        // Make sure I've clicked a column and not the gaps in between

        game.playRound(x, y);
        
        updateScreen();
      }


    }


    computerGrid.addEventListener("click", clickHandlerBoard);

    //drag and drop
    const startGameModalGrid = document.querySelector(".main-modal-start-game-grid");

    const grid = []

    for (let i = 0; i < 10; i++){
        grid[i] = [];
        for (let j = 0; j < 10; j++){
            grid[i][j] = null;
        }
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let gridItem = document.createElement("div");
        gridItem.dataset.column = i
        gridItem.dataset.row = j
        gridItem.classList.add("grid-item")
        startGameModalGrid.appendChild(gridItem);
    }
}


    function handleDragStart(e){
      this.classList.add("dragging")
    }

    function handleDragEnd(e){
      this.classList.remove("dragging")

    }

    function handleDragOver(e){
      e.preventDefault()
      const draggable = document.querySelector(".dragging")
      this.append(draggable)
    }

    let ships = document.querySelectorAll(".ship")

    ships.forEach(ship => {
      ship.addEventListener('dragstart', handleDragStart)
      ship.addEventListener('dragend', handleDragEnd)
      ship.addEventListener('click', (e) => {
        if (e.target.dataset.position === "vertical"){
          e.target.dataset.position = "horizontal"
        } else {
          e.target.dataset.position = "vertical"
        }
      })
    })

    let gridItems = document.querySelectorAll(".grid-item")

    gridItems.forEach(item => {
      item.addEventListener('dragover', handleDragOver)
    })

    

    function startGame(playerShips){
      //{ x: 6, y: 4, alignment: "vertical" }
      ships = document.querySelectorAll(".ship")

      let correctPositioned = []

      ships.forEach(ship => {


        let x = parseInt(ship.parentElement.getAttribute("data-row"))
        let y = parseInt(ship.parentElement.getAttribute("data-column"))
        let alignment = ship.getAttribute("data-position")
        let position = parseInt(ship.getAttribute("id").slice(5, 6))

        if(alignment === "horizontal" && position + x > 10 || alignment === "vertical" && position + y > 10){
          console.log("mal vertical")
          console.log(ship)
          ship.style.background = "red"
          return
        } else {
          correctPositioned.push({x: x, y: y, alignment: alignment, position: position}) 
        }
      })

        if (correctPositioned.length === 5) {
        let sorted = correctPositioned.sort((a, b) => {
          if (a.position > b.position){
            return 1
          } 
          if(a.position < b.position){
            return -1
          }
          return 0
        })
        game = GameLoop(sorted);
        updateScreen()

        startGameContainer.style.display = 'none';
        mainGameContainer.style.display = 'flex';
        }
    }

    function endGame(){

    }

    // Initial renders

    const startGameButton = document.querySelector(".main-modal-start-game-button")

    startGameButton.addEventListener('click', startGame)
    
    
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }

export default ScreenController;