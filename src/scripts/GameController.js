import Game from './Game';

const SHIPS_SETUP = [
  { name: 'Patrol Boat', length: 2 },
  { name: 'Patrol Boat', length: 2 },
  { name: 'Patrol Boat', length: 2 },
  { name: 'Patrol Boat', length: 2 },
  { name: 'Destroyer', length: 3 },
  { name: 'Destroyer', length: 3 },
  { name: 'Submarine', length: 3 },
  { name: 'Battleship', length: 4 },
  { name: 'Battleship', length: 4 },
  { name: 'Carrier', length: 5 },
];

export const getGameDefaults = function getGameDefaults() {
  return { shipsSetup: SHIPS_SETUP };
};

export const setupGame = function setupGame() {
  const game = new Game(SHIPS_SETUP);
  game.addPlayer('p');
  game.addPlayer('ai');
  return game;
};
