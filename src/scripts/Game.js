import Player from './Player';

class Game {
  #player1;

  #player2;

  #turn;

  #shipsSetup;

  constructor(shipsSetup) {
    this.#player1 = null;
    this.#player2 = null;
    this.#turn = this.#player1;
    this.#shipsSetup = shipsSetup;
  }

  // create and assign a new player to game
  addPlayer(playerType) {
    const pl = new Player(playerType);
    pl.getGameboard().setupShips(this.#shipsSetup);
    // fill in  player 1 first
    if (this.#player1 === null) {
      this.#player1 = pl;
      return this.#player1;
    }
    // if first player was in fill player 2
    if (this.#player2 === null) {
      this.#player2 = pl;
      return this.#player2;
    }

    // if max players reached its null
    return null;
  }

  player(number) {
    if (number === 1) {
      return this.#player1;
    }
    if (number === 2) {
      return this.#player2;
    }
    return null;
  }

  #changeTurn() {
    this.#turn = this.#turn === this.#player1 ? this.#player2 : this.#player1;
  }

  placeShipFor(playerNumber, shipName, shipLength, coordinates) {
    return this.player(playerNumber).placeShip(shipName, shipLength, coordinates);
  }

  // playTurn(coordinates) {
  //   const activePlayer = this.#turn;
  //   activePlayer.receiveAttack()
  // }
}

export default Game;
