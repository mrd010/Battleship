import Gameboard from '../scripts/Gameboard';
import Ship from '../scripts/Ship';

test('gameboard initials', () => {
  const gameboard = new Gameboard();
  expect(gameboard.getBoard().length).toBe(10);
  expect(gameboard.getBoard()[0].length).toBe(10);
  expect(
    gameboard.getBoard().every((row) => {
      return row.every((square) => square === null) === true;
    })
  ).toBeTruthy();
});

describe('Gameboard place ships', () => {
  let gameboard;
  beforeAll(() => {
    gameboard = new Gameboard();
    gameboard.setupShips([
      { name: 'Destroyer', length: 3 },
      { name: 'Destroyer', length: 3 },
      { name: 'Patrol', length: 2 },
    ]);
  });

  test('can place 3 length ship in [5,6][5,7][5,8]', () => {
    expect(
      gameboard.placeShip('Destroyer', 3, [
        [5, 6],
        [5, 7],
        [5, 8],
      ])
    ).toBeTruthy();
    expect(gameboard.getSquare([5, 6])).toBeInstanceOf(Ship);
    expect(gameboard.getSquare([5, 7])).toBeInstanceOf(Ship);
    expect(gameboard.getSquare([5, 8])).toBeInstanceOf(Ship);
    expect(gameboard.getSquare([5, 5])).toBeNull();
  });

  test('cant place 2 length ship in [9,9][10,9]', () => {
    expect(
      gameboard.placeShip('Patrol', 2, [
        [9, 9],
        [10, 9],
      ])
    ).toBeFalsy();
    expect(gameboard.getSquare([9, 9])).toBeNull();
  });

  test('cant place 2 ships adjacent 1', () => {
    expect(
      gameboard.placeShip('Destroyer', 3, [
        [6, 5],
        [6, 6],
        [6, 7],
      ])
    ).toBeFalsy();
  });
  test('can place this ship', () => {
    expect(
      gameboard.placeShip('Destroyer', 3, [
        [7, 5],
        [7, 6],
        [7, 7],
      ])
    ).toBeTruthy();
  });
  test('cant place 2 ships adjacent 3', () => {
    expect(
      gameboard.placeShip('Patrol', 2, [
        [5, 5],
        [6, 5],
      ])
    ).toBeFalsy();
  });
});

describe('Receive attack function', () => {
  let gameboard;
  beforeAll(() => {
    gameboard = new Gameboard();
    gameboard.setupShips([
      { name: 'Destroyer', length: 3 },
      { name: 'Patrol', length: 2 },
    ]);
    gameboard.placeShip('Destroyer', 3, [
      [3, 3],
      [2, 3],
      [1, 3],
    ]);
    gameboard.placeShip('Patrol', 2, [
      [5, 3],
      [4, 3],
    ]);
  });

  test('missing attack at [6,3]', () => {
    expect(gameboard.receiveAttack([6, 3]).wasSuccess).toBeFalsy();
  });

  test('cant shot same spot again', () => {
    expect(gameboard.isValidShot([6, 3])).toBeFalsy();
  });

  test('can shot a new spot', () => {
    expect(gameboard.isValidShot([3, 3])).toBeTruthy();
  });
  test('cant shot out of box', () => {
    expect(gameboard.isValidShot([20, 3])).toBeFalsy();
  });

  test('hitting attack at [3,3]', () => {
    expect(gameboard.receiveAttack([3, 3]).wasSuccess).toBeTruthy();
  });
  test('hitting attack at [2,3] not sunk', () => {
    expect(gameboard.receiveAttack([2, 3]).destroyed).toBeFalsy();
  });
  test('hitting attack at [1,3] and sunk', () => {
    expect(gameboard.receiveAttack([1, 3]).destroyed).toBeTruthy();
  });

  test('hitting attack at [1,3] again', () => {
    expect(gameboard.isValidShot([1, 3])).toBeFalsy();
  });

  test('second ship is alive yet', () => {
    gameboard.receiveAttack([5, 3]);
    expect(gameboard.allShipsSunken()).toBeFalsy();
  });

  test('Destroy second ship', () => {
    gameboard.receiveAttack([4, 3]);
    expect(gameboard.allShipsSunken()).toBeTruthy();
  });
});
