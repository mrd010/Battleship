const SHIPS_SETUP = [
  { name: 'Patrol', length: 2 },
  { name: 'Destroyer', length: 3 },
];

const BOARD_WIDTH = 10;

export const getGameDefaults = function getGameDefaults() {
  return { shipsSetup: SHIPS_SETUP, boardWidth: BOARD_WIDTH };
};
