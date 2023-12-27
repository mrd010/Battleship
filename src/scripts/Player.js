import Gameboard from './Gameboard';

class Player {
  #gameboard;

  #isAI;

  constructor(type = 'p') {
    this.#gameboard = new Gameboard();
    this.#isAI = type === 'ai';
  }

  isAI() {
    return this.#isAI;
  }

  getGameboard() {
    return this.#gameboard;
  }

  placeShip(shipName, shipLength, coordinates) {
    return this.#gameboard.placeShip(shipName, shipLength, coordinates);
  }

  receiveAttack(coordinate) {
    if (this.#gameboard.isValidShot(coordinate)) {
      return { fired: true, shot: this.#gameboard.receiveAttack(coordinate) };
    }

    return { fired: false };
  }

  isLost() {
    return this.#gameboard.allShipsSunken();
  }
}

export default Player;
