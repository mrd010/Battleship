import Ship from '../scripts/Ship';

let testShip;

describe('ship hitting test', () => {
  beforeEach(() => {
    testShip = new Ship(1);
  });

  test('ship is healthy', () => {
    expect(testShip.getHitCount()).toBe(0);
  });
  test('ship is hit once', () => {
    testShip.hit();
    expect(testShip.getHitCount()).toBe(1);
  });

  test('ship is hit 5 times', () => {
    for (let i = 0; i < 5; i++) {
      testShip.hit();
    }
    expect(testShip.getHitCount()).toBe(5);
  });
});

describe('ship sunk test', () => {
  beforeEach(() => {
    testShip = new Ship(2);
  });

  test('ship is not sunk', () => {
    expect(testShip.isSunk()).toBeFalsy();
  });
  test('ship is hit once', () => {
    testShip.hit();
    expect(testShip.isSunk()).toBeFalsy();
  });

  test('ship is hit 2 times', () => {
    testShip.hit();
    testShip.hit();
    // testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
  });
  test('ship is hit 5 times', () => {
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    // testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
  });
});
