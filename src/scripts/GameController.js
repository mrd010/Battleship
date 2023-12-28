import Game from './Game';

const SHIPS_SETUP = [
  { name: 'Patrol', length: 2 },
  { name: 'Destroyer', length: 3 },
];

export const getGameDefaults = function getGameDefaults() {
  return { shipsSetup: SHIPS_SETUP };
};

export const setupGame = function setupGame() {
  const game = new Game(SHIPS_SETUP);
};
