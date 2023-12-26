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

  test('cant place 5 length ship in a few squares [1,1][1,2][1,3]', () => {
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
