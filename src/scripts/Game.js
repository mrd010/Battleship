import Player from './Player';

class Game {
  #player1;

  #player2;

  #turn;

  #shipsSetup;

  constructor(shipsSetup) {
    this.#player1 = null;
    this.#player2 = null;
    this.#shipsSetup = shipsSetup;
  }

  // create and assign a new player to game
  addPlayer(playerType) {
    const pl = new Player(playerType, this.#shipsSetup);
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

  placeShipFor(playerNumber, shipName, shipLength, coordinates) {
    if (this.player(playerNumber) !== null) {
      return this.player(playerNumber).placeShip(shipName, shipLength, coordinates);
    }

    return false;
  }

  allShipsPlaced(playerNum) {
    return this.player(playerNum).getGameboard().allShipsPlaced();
  }

  playTurn(shotCoordinates) {
    const battleReport = { playerShotStatus: 'invalid', aiShots: [], winner: 0 };
    const attackResult = this.#player2.receiveAttack([shotCoordinates.x, shotCoordinates.y]);
    if (attackResult.fired) {
      if (attackResult.shot.wasSuccess) {
        battleReport.playerShotStatus = 'hit';
        if (attackResult.win) {
          battleReport.winner = 1;
        }
        return battleReport;
      }
      battleReport.playerShotStatus = 'miss';
      let aiAttackResult;
      do {
        let x;
        let y;
        do {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * 10);
          aiAttackResult = this.#player1.receiveAttack([x, y]);
        } while (!aiAttackResult.fired);
        battleReport.aiShots.push({
          coordinate: [x, y],
          shotStatus: aiAttackResult.shot.wasSuccess ? 'hit' : 'miss',
        });
        if (aiAttackResult.win) {
          battleReport.winner = 2;
        }
      } while (aiAttackResult.shot.wasSuccess && battleReport.winner === 0);
    }

    return battleReport;
  }
}

export default Game;
