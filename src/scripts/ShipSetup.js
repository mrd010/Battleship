import Ship from './Ship';

// const shipsSetup = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5];

// create an array of ship object with given setup
const createShips = function createShipsFromShipsSetup(shipsSetup) {
  return shipsSetup.map((shipType) => new Ship(shipType));
};

export default createShips;
