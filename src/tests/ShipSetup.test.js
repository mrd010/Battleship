import Ship from '../scripts/Ship';
import createShips from '../scripts/ShipSetup';

describe('Ship Create test', () => {
  test('creates desired setup', () => {
    const ships = createShips([2, 3, 4]);
    expect(ships).toHaveLength(3);
    for (let i = 0; i < ships.length; i++) {
      expect(ships[i].getLength()).toBe([2, 3, 4][i]);
      expect(ships[i].getHitCount()).toBe(0);
    }
  });
});
