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
}

export default Game;
