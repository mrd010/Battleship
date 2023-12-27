import Player from './Player';

class Game {
  #player1;
  #player2;

  #turn;

  constructor() {
    this.#player1 = null;
    this.#player2 = null;
    this.#turn = this.#player1;
  }

  // create and assign a new player to game
  addPlayer(playerType) {
    if (this.#player1 === null) {
      this.#player1 = new Player(playerType);
      return this.#player1;
    } else if (this.#player2 === null) {
      this.#player2 = new Player(playerType);
      return this.#player2;
    } else {
      return null;
    }
  }

  placeShip(playerNumber, shipLength, coordinates) {
    const pl = this.#players.find((player) => player.getNumber() === playerNumber);
    if (pl === undefined) {
      return false;
    }
    return pl.getGameboard().placeShip(shipLength, coordinates);
  }
}

export default Game;
