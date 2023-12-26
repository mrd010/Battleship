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
  beforeEach(() => (gameboard = new Gameboard()));

  test('can place 2 length ship in [5,6][5,7]', () => {
    expect(
      gameboard.placeShip(2, [
        [5, 6],
        [5, 7],
      ])
    ).toBeTruthy();
    expect(gameboard.getSquare([5, 6])).toBeInstanceOf(Ship);
    expect(gameboard.getSquare([5, 7])).toBeInstanceOf(Ship);
    expect(gameboard.getSquare([5, 5])).toBeNull();
  });

  test('cant place 2 length ship in [9,9][10,9]', () => {
    expect(
      gameboard.placeShip(2, [
        [9, 9],
        [10, 9],
      ])
    ).toBeFalsy();
    expect(gameboard.getSquare([9, 9])).toBeNull();
  });

  test('cant place 11 length ship in board', () => {
    expect(
      gameboard.placeShip(11, [
        [0, 9],
        [1, 9],
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
        [7, 9],
        [8, 9],
        [9, 9],
        [10, 9],
      ])
    ).toBeFalsy();
    expect(gameboard.getSquare([3, 9])).toBeNull();
  });

  test('cant place 3 length ship in [1,1][0,1][-1,1]', () => {
    expect(
      gameboard.placeShip(3, [
        [1, 1],
        [0, 1],
        [-1, 1],
      ])
    ).toBeFalsy();
    expect(gameboard.getSquare([1, 1])).toBeNull();
    expect(gameboard.getSquare([0, 1])).toBeNull();
  });

  test('cant place 5 length ship in a few squares', () => {
    expect(
      gameboard.placeShip(5, [
        [1, 1],
        [1, 2],
        [1, 3],
      ])
    ).toBeFalsy();
    expect(gameboard.getSquare([1, 1])).toBeNull();
    expect(gameboard.getSquare([1, 2])).toBeNull();
    expect(gameboard.getSquare([1, 3])).toBeNull();
  });
});

describe.only('Receive attack function', () => {
  let gameboard;
  beforeAll(() => {
    gameboard = new Gameboard();
    gameboard.placeShip(3, [
      [3, 3],
      [2, 3],
      [1, 3],
    ]);
  });

  test('missing attack at [4,3]', () => {
    expect(gameboard.receiveAttack([4, 3]).wasSuccess).toBeFalsy();
  });

  test('cant shot same spot again', () => {
    expect(gameboard.isValidShot([4, 3])).toBeFalsy();
  });

  test('can shot a new spot', () => {
    expect(gameboard.isValidShot([3, 3])).toBeTruthy();
  });

  test('hitting attack at [3,3]', () => {
    expect(gameboard.receiveAttack([3, 3]).wasSuccess).toBeTruthy();
  });
  test('hitting attack at [2,3] not sunk', () => {
    expect(gameboard.receiveAttack([2, 3]).isSunk).toBeFalsy();
  });
  test('hitting attack at [1,3] and sunk', () => {
    expect(gameboard.receiveAttack([1, 3]).isSunk).toBeTruthy();
  });

  test('hitting attack at [1,3] and sunk', () => {
    expect(gameboard.isValidShot([1, 3])).toBeFalsy();
  });
});
