import Gameboard from './Gameboard';

class Player {
  #gameboard;

  #isAI;

  constructor(type = 'p') {
    this.#gameboard = new Gameboard();
    this.#isAI = type === 'ai';
  }

  giveControlToAi() {
    this.#isAI = true;
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
