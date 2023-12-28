import { getGameDefaults } from './GameController';
import { createPlayScreen, createStartScreen } from './TemplateCreator';

const loadPlayScreen = function loadPlayScreen() {
  // create play screen with default settings
  const gameDefaults = getGameDefaults();
  const playScreen = createPlayScreen(gameDefaults.shipsSetup, gameDefaults.boardWidth);

  // hide starting screen page
  document.getElementById('start-screen').remove();
  document.body.appendChild(playScreen);
  document.querySelectorAll('#player-board .game-board button').forEach((button) => {
    button.addEventListener('click', () => {
      console.log(`[${button.getAttribute('data-x')},${button.getAttribute('data-y')}]`);
    });
  });
};

const initDisplay = function initDisplay() {
  // create start screen
  document.body.setAttribute('class', 'bg-gradient-to-b h-screen from-slate-950 to-slate-900');
  const startScreen = createStartScreen();
  document.body.appendChild(startScreen);

  // start button loads game
  startScreen.querySelector('#start-button').addEventListener('click', loadPlayScreen);
};

export default initDisplay;
