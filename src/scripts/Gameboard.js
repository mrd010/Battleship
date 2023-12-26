import createShips from './ShipSetup';

class Gameboard {
  // array of ship objects belong to this game board
  #ships;

  //   2d array of board
  #board;

  constructor(shipsSetup) {
    this.#board = [[]];
    // setup ships array
    this.#ships = createShips(shipsSetup);
  }
}

export default Gameboard;
