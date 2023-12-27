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
      return { attacked: true, shot: this.#gameboard.receiveAttack(coordinate) };
    }

    return { attacked: false };
  }

  isLost() {
    return this.#gameboard.allShipsSunken();
  }
}

export default Player;
