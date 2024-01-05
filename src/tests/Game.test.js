import Game from '../scripts/Game';
import { setupGame } from '../scripts/GameController';
import Player from '../scripts/Player';

describe('Play Turn Test', () => {
  const battleshipsGame = setupGame();
  test('Add first player', () => {
    expect(battleshipsGame.playTurn({ x: -1, y: 0 }).playerShotStatus).toBe('invalid');
  });
});
