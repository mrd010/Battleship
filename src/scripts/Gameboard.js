import Ship from './Ship';

class Gameboard {
  //   2d array of board
  #board;

  constructor() {
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        this.#board[x][y] = null;
      }
    }
  }

  #areEmpty(coordinatesArray) {
    return coordinatesArray.every((coordinate) => this.#board[coordinate.x][coordinate.y] === null);
  }

  placeShip(shipLength, coordinatesArray) {
    // if squares are occupied
    if (!this.#areEmpty(coordinatesArray)) {
      return false;
    }

    // if squares are empty
    const ship = new Ship(shipLength);
    coordinatesArray.forEach((coordinate) => {
      // place ship in square
      this.#board[coordinate.x][coordinate.y] = ship;
    });
    return true;
  }
}

export default Gameboard;
