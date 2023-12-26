import Gameboard from './Gameboard';

class Player {
  #gameboard;

  constructor() {
    this.#gameboard = new Gameboard();
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
