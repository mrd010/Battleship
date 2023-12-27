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

describe('player got attacked', () => {
  const player = new Player();

  test('can attack at [5,6] first time', () => {
    expect(player.receiveAttack([5, 6]).fired).toBeTruthy();
  });
  test('cant attack at [5,6] second time', () => {
    expect(player.receiveAttack([5, 6]).fired).toBeFalsy();
  });
  test('cant attack at out of board second time', () => {
    expect(player.receiveAttack([15, 6]).fired).toBeFalsy();
  });
});
