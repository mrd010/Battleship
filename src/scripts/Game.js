import Player from './Player';

class Game {
  #players;

  #turn;

  constructor() {
    this.#players = [];
    this.#turn = 0;
  }

  // create and assign a new player to game
  addPlayer(playerType) {
    const p = new Player(playerType);
    this.#players.push(p);
    return p;
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
