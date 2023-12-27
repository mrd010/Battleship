import Game from '../scripts/Game';
import Player from '../scripts/Player';

describe('Add player', () => {
  const shipsSetup = [];
  const battleshipsGame = new Game(shipsSetup);
  test('Add first player', () => {
    expect(battleshipsGame.addPlayer()).toBeInstanceOf(Player);
  });
  test('Add second player as ai', () => {
    expect(battleshipsGame.addPlayer('ai')).toBeInstanceOf(Player);
  });
  test('max player is 2', () => {
    expect(battleshipsGame.addPlayer()).toBeNull();
  });
  test('First Player is human', () => {
    expect(battleshipsGame.player(1).isAI()).toBeFalsy();
  });
  test('SEcond Player is ai', () => {
    expect(battleshipsGame.player(2).isAI()).toBeTruthy();
  });
});
