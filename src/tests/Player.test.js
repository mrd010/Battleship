import Player from '../scripts/Player';

describe('player creation', () => {
  const player = new Player();
  const cpu = new Player('ai');

  test('player is human', () => {
    expect(player.isAI()).toBeFalsy();
  });
  test('cpu is ai', () => {
    expect(cpu.isAI()).toBeTruthy();
  });
});
