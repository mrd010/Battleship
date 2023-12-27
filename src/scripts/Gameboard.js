import Ship from './Ship';

class Gameboard {
  //   2d array of board
  #board;

  #ships;

  #shotsReceived;

  constructor() {
    this.#shotsReceived = [];
    this.#ships = [];
    this.#board = [];
    for (let x = 0; x < 10; x += 1) {
      this.#board[x] = [];
      for (let y = 0; y < 10; y += 1) {
        this.#board[x][y] = null;
      }
    }
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

  #areValidSquares(coordinatesArray) {
    // check if all coordinates are Valid in board
    return coordinatesArray.every(
      (coordinate) =>
        coordinate[0] >= 0 &&
        coordinate[0] < 10 &&
        coordinate[1] >= 0 &&
        coordinate[1] < 10 &&
        this.#board[coordinate[0]][coordinate[1]] === null
    );
  }

  placeShip(shipName, shipLength, coordinatesArray) {
    // if squares are occupied
    if (
      shipLength > 9 ||
      shipLength !== coordinatesArray.length ||
      !this.#areValidSquares(coordinatesArray)
    ) {
      return false;
    }

    // if squares are Valid
    const currentShip = this.#ships.find(
      (ship) => ship.getName() === shipName && ship.getLength() === shipLength && !ship.isPlaced()
    );
    if (currentShip) {
      coordinatesArray.forEach((coordinate) => {
        // place ship in square
        this.#board[coordinate[0]][coordinate[1]] = currentShip;
      });
      return true;
    }

    return false;
  }

  isValidShot([x, y]) {
    return !this.#shotsReceived.some(
      (shot) => shot.coordinates[0] === x && shot.coordinates[1] === y
    );
  }

  receiveAttack([x, y]) {
    // if coordinates out of box or not on a ship miss shot
    if (this.#board[x][y] === null) {
      this.#shotsReceived.push({ coordinates: [x, y], wasSuccess: false });
      return { wasSuccess: false };
    }

    //  if coordinates are on a ship register shop as success and inform if ship is sunken
    const targetShip = this.#board[x][y];
    targetShip.hit();
    this.#shotsReceived.push({ coordinates: [x, y], wasSuccess: true });

    return { wasSuccess: true, destroyed: targetShip.isSunk() };
  }

  allShipsSunken() {
    return this.#ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
