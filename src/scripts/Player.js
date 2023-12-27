import Gameboard from './Gameboard';

class Player {
  #number;

  #gameboard;

  #isAI;

  constructor(number, type = 'p') {
    this.#gameboard = new Gameboard();
    this.#number = number;
    this.#isAI = type === 'ai';
  }

  getNumber() {
    return this.#number;
  }

  isAI() {
    return this.#isAI;
  }

  getGameboard() {
    return this.#gameboard;
  }

  //   attack(opponent, coordinates) {
  //     if (!opponent.getGameboard().isValidShot(coordinates)) {
  //       return { attacked: false };
  //     }

  //     return { attacked: true, shot: opponent.getGameboard().receiveAttack(coordinates) };
  //   }
}

export default Player;
