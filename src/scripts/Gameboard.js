import Ship from './Ship';

class Gameboard {
  //   2d array of board
  #board;

  #ships;

  #shotsReceived;

  #initialize2DBoard() {
    for (let x = 0; x < 10; x += 1) {
      this.#board[x] = [];
      for (let y = 0; y < 10; y += 1) {
        this.#board[x][y] = null;
      }
    }
  }

  constructor() {
    this.#shotsReceived = [];
    this.#ships = [];
    this.#board = [];
    this.#initialize2DBoard();
  }

  getBoard() {
    return this.#board;
  }

  getSquare([x, y]) {
    return this.#board[x][y];
  }

  setupShips(settings) {
    this.#ships = settings.map((shipDetail) => new Ship(shipDetail));
  }

  #isCoordinateInBoard([x, y]) {
    return x >= 0 && x < this.#board.length && y >= 0 && y < this.#board.length;
  }

  #areValidSquares(coordinatesArray) {
    // check if all coordinates are Valid in board
    return coordinatesArray.every(
      (coordinate) =>
        this.#isCoordinateInBoard(coordinate) && this.#board[coordinate[0]][coordinate[1]] === null
    );
  }

  #isValidPlacement(shipLength, coordinatesArray) {
    return (
      shipLength <= 9 &&
      shipLength === coordinatesArray.length &&
      this.#areValidSquares(coordinatesArray)
    );
  }

  placeShip(shipName, shipLength, coordinatesArray) {
    if (this.#isValidPlacement(shipLength, coordinatesArray)) {
      // if squares are Valid
      const currentShip = this.#ships.find(
        (ship) => ship.getName() === shipName && ship.getLength() === shipLength && !ship.isPlaced()
      );
      if (currentShip) {
        coordinatesArray.forEach((coordinate) => {
          // place ship in square
          this.#board[coordinate[0]][coordinate[1]] = currentShip;
        });
        currentShip.fortify();
        return true;
      }
    }
    return false;
  }

  isValidShot([x, y]) {
    return (
      this.#isCoordinateInBoard([x, y]) &&
      !this.#shotsReceived.some((shot) => shot.coordinates[0] === x && shot.coordinates[1] === y)
    );
  }

  #hitShot([x, y]) {
    const targetShip = this.#board[x][y];
    targetShip.hit();
    this.#shotsReceived.push({ coordinates: [x, y], wasSuccess: true });
    return { wasSuccess: true, destroyed: targetShip.isSunk() };
  }

  #missShot([x, y]) {
    this.#shotsReceived.push({ coordinates: [x, y], wasSuccess: false });
    return { wasSuccess: false };
  }

  receiveAttack([x, y]) {
    // if coordinates out of box or not on a ship miss shot
    if (this.#board[x][y] === null) {
      return this.#missShot([x, y]);
    }
    //  if coordinates are on a ship register shop as success and inform if ship is sunken
    return this.#hitShot([x, y]);
  }

  allShipsSunken() {
    return this.#ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
