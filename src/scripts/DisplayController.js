import { getGameDefaults } from './GameController';
import { createPlayScreen, createStartScreen } from './TemplateCreator';

const createShipPlaceholder = function createShipPlaceholder(
  shipLabel,
  sampleCell,
  orientation,
  coordinates
) {
  // 1.clone ship label element
  const shipPlaceholder = shipLabel.cloneNode();
  // 2.correct placeholder size and position
  const sampleSize = getComputedStyle(sampleCell).getPropertyValue('width').slice(0, -2);
  const shipSize = Number(shipPlaceholder.getAttribute('data-ship-length'));
  const shipWidth = orientation === 'h' ? shipSize : 1;
  const shipHeight = orientation === 'v' ? shipSize : 1;
  // size
  shipPlaceholder.style.width = `${sampleSize * shipWidth}px`;
  shipPlaceholder.style.height = `${sampleSize * shipHeight}px`;
  // position
  const startPointRow = Math.min(
    11 - shipHeight,
    Math.max(1, coordinates.x + 1 - Math.floor(shipHeight / 2))
  );
  const startPointCol = Math.min(
    11 - shipWidth,
    Math.max(1, coordinates.y + 1 - Math.floor(shipWidth / 2))
  );

  shipPlaceholder.style.gridRowStart = `${startPointRow}`;
  shipPlaceholder.style.gridColumnStart = `${startPointCol}`;
  shipPlaceholder.style.gridRowEnd = `span ${shipHeight}`;
  shipPlaceholder.style.gridColumnEnd = `span ${shipWidth}`;
  // 3.make text inside according to ship label name
  shipPlaceholder.textContent = shipLabel.firstChild.textContent;
  shipPlaceholder.removeAttribute('for');

  // 4.text orientation
  shipPlaceholder.style.writingMode = orientation === 'h' ? 'horizontal-tb' : 'vertical-rl';

  // 4.send it behind
  shipPlaceholder.classList.add('-z-10');

  // 5.give coordinates in board

  return shipPlaceholder;
};

const showShipPlaceholder = function showShipPlaceholder(board, placeholder) {
  if (board.querySelector('label')) {
    board.querySelector('label').remove();
  }
  board.appendChild(placeholder);
};

const hideShipPlaceholder = function hideShipPlaceholder(placeholder) {
  if (placeholder !== null) {
    placeholder.remove();
  }
};

const loadPlayScreen = function loadPlayScreen() {
  // create play screen with default settings
  const gameDefaults = getGameDefaults();
  const playScreen = createPlayScreen(gameDefaults.shipsSetup, gameDefaults.boardWidth);

  // hide starting screen page
  document.getElementById('start-screen').remove();
  document.body.appendChild(playScreen);
  // activate ship for placement event
  let activeShipLabel = null;
  playScreen.querySelectorAll('#ships-menu .ship-button').forEach((shipBtn) => {
    shipBtn.querySelector('input').addEventListener('change', (e) => {
      if (e.target.checked) {
        activeShipLabel = shipBtn.querySelector('label');
      }
    });
  });

  let shipPlaceholder = null;
  let coordinates = { x: 0, y: 0 };
  let orientation = 'h';

  const playerBoard = playScreen.querySelector('#player-field .game-board');
  playerBoard.querySelectorAll('button').forEach((boardBtn) => {
    boardBtn.addEventListener('mouseenter', () => {
      coordinates = {
        x: Number(boardBtn.getAttribute('data-x')),
        y: Number(boardBtn.getAttribute('data-y')),
      };

      if (activeShipLabel !== null) {
        shipPlaceholder = createShipPlaceholder(
          activeShipLabel,
          boardBtn,
          orientation,
          coordinates
        );
        if (shipPlaceholder !== null) {
          showShipPlaceholder(playerBoard, shipPlaceholder);
        }
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyR' && shipPlaceholder !== null) {
      e.preventDefault();
      orientation = orientation === 'h' ? 'v' : 'h';
      shipPlaceholder = createShipPlaceholder(
        activeShipLabel,
        playerBoard.firstChild,
        orientation,
        coordinates
      );
      showShipPlaceholder(playerBoard, shipPlaceholder);
    }
  });

  playerBoard.addEventListener('mouseleave', () => {
    hideShipPlaceholder(shipPlaceholder);
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
