import Ship from './Ship';

class Gameboard {
  // array of ship objects belong to this game board
  #ships;

  //   2d array of board
  #board;

  constructor(shipsSetup) {
    this.#board = [[]];
    // setup ships array
    this.#ships = shipsSetup.map((shipType) => new Ship(shipType));
  }
}

export default Gameboard;
