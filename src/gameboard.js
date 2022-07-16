const Ship = require("./ship-factory")

const Gameboard = (coordS1, coordS2, coordS3, coordS4, coordS5) => {
    
    //crear tablero de juego
    const grid = []

    for (let i = 0; i < 10; i++){
        grid[i] = [];
        for (let j = 0; j < 10; j++){
            grid[i][j] = null;
        }
    }

    //funcion para poner bote en el tablero
    function placeShip(ship){
        //{name: length: 2, x: 3, y: 1, alignment: vertical}
        if(ship.alignment === "vertical"){
            for(let i = 0; i < ship.length; i++){
                grid[ship.x+i][ship.y] = {ship: ship.name, position: i}
            }
        } else {
            for (let i = 0; i < ship.length; i++){    
                grid[ship.x][ship.y+i] = {ship: ship.name, position: i}
            }
        }
    }

    //definicion de los botes

    const s1 = Ship(1, coordS1.x, coordS1.y, coordS1.alignment)
    const s2 = Ship(2, coordS2.x, coordS2.y, coordS2.alignment)
    const s3 = Ship(3, coordS3.x, coordS3.y, coordS3.alignment)
    const s4 = Ship(4, coordS4.x, coordS4.y, coordS4.alignment)
    const s5 = Ship(5, coordS5.x, coordS5.y, coordS5.alignment)    

    const fleet = [s1, s2, s3, s4, s5]

    //poner los botes en su respectivo lugar
    fleet.forEach((ship) => placeShip(ship))

    const receiveAttack = (x, y) => {

        if (grid[x][y] !== null){
            switch(grid[x][y].ship){
                case "s1":
                    fleet[0].hit(grid[x][y].position)
                    grid[x][y] = true;
                    break;
                case "s2":
                    fleet[1].hit(grid[x][y].position)
                    grid[x][y] = true;
                    break;
                case "s3":
                    fleet[2].hit(grid[x][y].position)
                    grid[x][y] = true;
                    break;
                case "s4":
                    fleet[3].hit(grid[x][y].position)
                    grid[x][y] = true;
                    break;   
                case "s5":
                    fleet[4].hit(grid[x][y].position)
                    grid[x][y] = true;
                    break;
            }
        } else {
            grid[x][y] = false;
        }
    }

    const isFleetSunk = () => {
       return fleet.every(ship => ship.isSunk() === true)
    }

    const avaliableCoordinates = () => {

        let coordinates = [];

        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                if (grid[i][j] !== true && grid[i][j] !== false) {
                    coordinates.push({x: i, y: j})
                }
            }
        }

        return coordinates;
    }

     return {grid, receiveAttack, isFleetSunk, avaliableCoordinates}
}



module.exports = Gameboard;