import Gameboard from './Gameboard';

class Player {
  #gameboard;

  #isAI;

  constructor(type, shipsSetup) {
    this.#gameboard = new Gameboard();
    this.#gameboard.setupShips(shipsSetup);
    this.#isAI = false;
    if (type === 'ai') {
      this.#isAI = true;
      console.log(this.#gameboard.randomPlaceShips());
    }
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
