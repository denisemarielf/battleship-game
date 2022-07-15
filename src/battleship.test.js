import Ship from './ship-factory';
import Gameboard from './gameboard'


describe('Ship factory', () => {
    //(shipLength, shipX, shipY, shipAlignment)
    //{name: length: 5, x: 0, y: 0, alignment: vertical}
    let intactShip = Ship(5, 0, 3, "vertical")
    let shipHitInPosition3 = Ship(3, 3, 5, "horizontal")
    let sunkShip = Ship(1, 9, 6, "vertical")
    sunkShip.hit(0);
    shipHitInPosition3.hit(2)
    it('has the correct amount of positions', () => {
        expect(intactShip.positions).toEqual([false, false, false, false, false])
    })
    it('marks the correct position as hit', () => {
        expect(shipHitInPosition3.positions).toEqual([false, false, true])
    })
    it('detects when a ship is sunk', () => {
        expect(sunkShip.isSunk()).toEqual(true)
    })
    it('detects when a ship is not sunk', ()=> {
        expect(intactShip.isSunk()).toEqual(false)
    })
    it('has the correct coordinates', ()=> {
        expect(intactShip.y).toEqual(3)
        expect(intactShip.x).toEqual(0)
    })
    it('displays the correct name', ()=> {
        expect(shipHitInPosition3.name).toEqual("s3")
    })
    it('displays the correct alignment', ()=> {
        expect(shipHitInPosition3.alignment).toEqual("horizontal")
    })
})

describe('Gameboard factory', () => {
    //(coordS1, coordS2, coordS3, coordS4, coordS5)
    const gameboard1 = Gameboard({x: 5, y: 3, alignment: "vertical"}, {x: 1, y: 3, alignment: "horizontal"}, {x: 3, y: 8, alignment: "vertical"}, {x: 7, y: 6, alignment: "horizontal"}, {x: 4, y: 1, alignment: "vertical"})
    const expectedGrid = [
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, {ship: "s2", position: 0}, {ship: "s2", position: 1}, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, {ship: "s3", position: 0}, null],
        [null, {ship: "s5", position: 0}, null, null, null, null, null, null, {ship: "s3", position: 1}, null],
        [null, {ship: "s5", position: 1}, null, {ship: "s1", position: 0}, null, null, null, null, {ship: "s3", position: 2}, null],
        [null, {ship: "s5", position: 2}, null, null, null, null, null, null, null, null],
        [null, {ship: "s5", position: 3}, null, null, null, null, {ship: "s4", position: 0}, {ship: "s4", position: 1}, {ship: "s4", position: 2}, {ship: "s4", position: 3}],
        [null, {ship: "s5", position: 4}, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
    ]

    const expectedGrid2 = [
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, {ship: "s2", position: 0}, {ship: "s2", position: 1}, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, {ship: "s3", position: 0}, null],
        [null, true, null, null, null, null, null, null, {ship: "s3", position: 1}, null],
        [null, {ship: "s5", position: 1}, null, {ship: "s1", position: 0}, null, null, null, null, {ship: "s3", position: 2}, null],
        [null, {ship: "s5", position: 2}, null, null, null, null, null, null, null, null],
        [null, {ship: "s5", position: 3}, null, null, null, null, {ship: "s4", position: 0}, {ship: "s4", position: 1}, {ship: "s4", position: 2}, {ship: "s4", position: 3}],
        [null, {ship: "s5", position: 4}, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
    ]

    const expectedGrid3 = [
        [false, null, null, null, null, null, null, null, null, null],
        [null, null, null, {ship: "s2", position: 0}, {ship: "s2", position: 1}, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, {ship: "s3", position: 0}, null],
        [null, true, null, null, null, null, null, null, {ship: "s3", position: 1}, null],
        [null, {ship: "s5", position: 1}, null, {ship: "s1", position: 0}, null, null, null, null, {ship: "s3", position: 2}, null],
        [null, {ship: "s5", position: 2}, null, null, null, null, null, null, null, null],
        [null, {ship: "s5", position: 3}, null, null, null, null, {ship: "s4", position: 0}, {ship: "s4", position: 1}, {ship: "s4", position: 2}, {ship: "s4", position: 3}],
        [null, {ship: "s5", position: 4}, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
    ]

    it('displays the correct grid', () => {
        expect(gameboard1.grid).toEqual(expectedGrid)
    })
    it('displays correctly a successful attack', () => {
        gameboard1.receiveAttack(4, 1)
        expect(gameboard1.grid).toEqual(expectedGrid2)
    })
    it('displays correctly a missed attack', () => {
        gameboard1.receiveAttack(0, 0)
        expect(gameboard1.grid).toEqual(expectedGrid3)
    })
    it('detects when all ships are NOT sunk', () => {
    expect(gameboard1.isFleetSunk()).toEqual(false)
    })
    it('detects when all ships are sunk', () => {
        gameboard1.receiveAttack(5, 3)
        gameboard1.receiveAttack(1, 3)
        gameboard1.receiveAttack(1, 4)
        gameboard1.receiveAttack(3, 8)
        gameboard1.receiveAttack(4, 8)
        gameboard1.receiveAttack(5, 8)
        gameboard1.receiveAttack(7, 6)
        gameboard1.receiveAttack(7, 7)
        gameboard1.receiveAttack(7, 8)
        gameboard1.receiveAttack(7, 9)
        gameboard1.receiveAttack(4, 1)
        gameboard1.receiveAttack(5, 1)
        gameboard1.receiveAttack(6, 1)
        gameboard1.receiveAttack(7, 1)
        gameboard1.receiveAttack(8, 1)
        gameboard1.receiveAttack(9, 1)
        expect(gameboard1.isFleetSunk()).toEqual(true)
    })


})

