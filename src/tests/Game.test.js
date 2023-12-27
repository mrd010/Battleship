import Game from '../scripts/Game';
import Player from '../scripts/Player';

describe('Adding players', () => {
  const game = new Game();
  test('first add is player 1 and return player1', () => {
    expect(game.addPlayer()).toBeInstanceOf(Player);
  });
  test('first add is player 2 and return player2', () => {
    expect(game.addPlayer('ai')).toBeInstanceOf(Player);
  });
  test('cant add more players', () => {
    expect(game.addPlayer()).toBeNull();
  });

  test('player 1 is human', () => {
    expect(game.player(1).isAI()).toBeFalsy();
  });
  test('player 2 is cpu', () => {
    expect(game.player(2).isAI()).toBeTruthy();
  });
  test('no more players', () => {
    expect(game.player(3)).toBeNull();
  });
});
