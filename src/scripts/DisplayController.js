import { getGameDefaults, setupGame } from './GameController';
import { createPlayScreen, createStartScreen } from './TemplateCreator';

const getSquareCoordinates = function getSquareCoordinates(square) {
  return { x: Number(square.getAttribute('data-col')), y: Number(square.getAttribute('data-row')) };
};
// #############################################################
const prepareNextPhase = function prepareNextPhase(playScreen, game) {
  playScreen.classList.replace('grid-rows-[auto_auto_1fr]', 'grid-rows-[auto_1fr]');
  // hide ships menu
  playScreen.querySelector('#ships-menu').remove();

  // show opponent board
  const opponentField = playScreen.querySelector('#opponent-field');
  const opponentBoard = opponentField.querySelector('.game-board');
  opponentField.classList.remove('opacity-20');
  //
  const playerField = playScreen.querySelector('#player-field');
  playerField.querySelector('.field-header .title').textContent = 'Player1';
  playerField.querySelector('.field-header .desc').textContent = '';
  const playerBoard = playerField.querySelector('.game-board');

  opponentBoard.querySelectorAll('button').forEach((boardBtn) => {
    boardBtn.classList.add('hover:bg-slate-50/20');
    boardBtn.addEventListener('click', () => {
      const coordinate = getSquareCoordinates(boardBtn);
      const battleResult = game.playTurn(coordinate);
      console.log(battleResult);
    });
  });
};
// #############################################################
const createShipPlaceholder = function createShipPlaceholder(
  shipLabel,
  sampleCell,
  orientation,
  coordinates
) {
  // 1.clone ship label element
  const shipPlaceholder = shipLabel.cloneNode();
  shipPlaceholder.classList.add('placeholder');
  // 2.correct placeholder size and position
  const sampleSize = getComputedStyle(sampleCell).getPropertyValue('width').slice(0, -2);
  const shipSize = Number(shipPlaceholder.getAttribute('data-ship-length'));
  const shipWidth = orientation === 'h' ? shipSize : 1;
  const shipHeight = orientation === 'v' ? shipSize : 1;
  // size
  // make width and height of placeholder according to board cells size and ship length and orientation of placeholder
  shipPlaceholder.style.width = `${sampleSize * shipWidth}px`;
  shipPlaceholder.style.height = `${sampleSize * shipHeight}px`;
  // position
  // place placeholder in board according to its size and pointer coordinates
  // also position cant be out of board
  const startPointCol = Math.min(
    11 - shipWidth,
    Math.max(1, coordinates.x + 1 - Math.floor(shipWidth / 2))
  );
  const startPointRow = Math.min(
    11 - shipHeight,
    Math.max(1, coordinates.y + 1 - Math.floor(shipHeight / 2))
  );

  // place holder spans from starting point to its length
  shipPlaceholder.style.gridRowStart = `${startPointRow}`;
  shipPlaceholder.style.gridColumnStart = `${startPointCol}`;
  shipPlaceholder.style.gridRowEnd = `span ${shipHeight}`;
  shipPlaceholder.style.gridColumnEnd = `span ${shipWidth}`;

  // 3.make text inside according to ship name
  const name = shipLabel.firstChild.cloneNode(true);
  shipPlaceholder.appendChild(name);
  shipPlaceholder.removeAttribute('for');

  // 4.text orientation changes on rotate
  shipPlaceholder.style.writingMode = orientation === 'h' ? 'horizontal-tb' : 'vertical-rl';

  // 5.send placeholder behind board and add colors
  shipPlaceholder.classList.add('-z-10');
  shipPlaceholder.classList.add('bg-gray-500/50');

  return shipPlaceholder;
};

// #############################################################
const showShipPlaceholder = function showShipPlaceholder(board, placeholder) {
  if (board.querySelector('.placeholder')) {
    // if there is ship showing in board remove it first
    board.querySelector('.placeholder').remove();
  }
  // then show new one on board
  board.appendChild(placeholder);
};

// #############################################################
const hideShipPlaceholder = function hideShipPlaceholder(placeholder) {
  if (placeholder !== null) {
    // if there is ship showing in board remove it
    placeholder.remove();
  }
  return null;
};

// #############################################################
const getShipGridCells = function getShipGridCells(shipElement, orientation) {
  const startPointX = Number(shipElement.style.gridColumnStart);
  const startPointY = Number(shipElement.style.gridRowStart);
  const shipLength = Number(shipElement.getAttribute('data-ship-length'));

  const coordinates = [];
  for (let i = 0; i < shipLength; i += 1) {
    if (orientation === 'h') {
      coordinates.push([startPointX - 1 + i, startPointY - 1]);
    } else {
      coordinates.push([startPointX - 1, startPointY - 1 + i]);
    }
  }

  return coordinates;
};
// #############################################################
const loadPlayScreen = function loadPlayScreen() {
  // setup game
  const game = setupGame();
  // create play screen with default settings
  const gameDefaults = getGameDefaults();
  const playScreen = createPlayScreen(gameDefaults.shipsSetup);

  // hide starting screen page
  document.getElementById('start-screen').remove();
  document.body.appendChild(playScreen);
  // activate ship for placement event
  let activeShipBtn = null;
  let activeShipLabel = null;
  playScreen.querySelectorAll('#ships-menu .ship-button').forEach((shipBtn) => {
    // mark activated ship in ships menu for placing
    shipBtn.querySelector('input').addEventListener('change', (e) => {
      if (e.target.checked) {
        activeShipBtn = e.target;
        activeShipLabel = shipBtn.querySelector('label');
      }
    });
  });

  // a copy of ship label which activated. we're gonna place it on board
  let shipPlaceholder = null;
  // coordinates of board cell which mouse is over it
  let coordinates = { x: 0, y: 0 };
  // rotation of ship indicator
  let orientation = 'h';

  const playerBoard = playScreen.querySelector('#player-field .game-board');
  playerBoard.querySelectorAll('button').forEach((boardBtn) => {
    boardBtn.addEventListener('mouseenter', () => {
      // when hover on any board cell and there is a ship selected for place
      if (activeShipLabel !== null) {
        // save current coordinates
        coordinates = getSquareCoordinates(boardBtn);
        // create a placeholder with in current coordinates and selected ship
        shipPlaceholder = createShipPlaceholder(
          activeShipLabel,
          boardBtn,
          orientation,
          coordinates
        );
        showShipPlaceholder(playerBoard, shipPlaceholder);
      }
    });

    boardBtn.addEventListener('click', () => {
      // placing placeholder when its on board and clicked

      if (shipPlaceholder !== null) {
        const isPlaced = game.placeShipFor(
          1,
          shipPlaceholder.getAttribute('data-ship-name'),
          Number(shipPlaceholder.getAttribute('data-ship-length')),
          getShipGridCells(shipPlaceholder, orientation)
        );
        // if placed leave ship on board
        if (isPlaced) {
          activeShipBtn.setAttribute('disabled', true);
          activeShipBtn.checked = false;
          shipPlaceholder.classList.remove('placeholder');
          // reset
          activeShipBtn = null;
          activeShipLabel = null;
          shipPlaceholder = null;

          // check if all player ships placed
          if (game.allShipsPlaced(1)) {
            prepareNextPhase(playScreen, game);
          }
        }
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyR' && activeShipLabel !== null) {
      // rotate placeholder when press R
      e.preventDefault();
      orientation = orientation === 'h' ? 'v' : 'h';
      if (shipPlaceholder !== null) {
        shipPlaceholder = createShipPlaceholder(
          activeShipLabel,
          playerBoard.firstChild,
          orientation,
          coordinates
        );
        showShipPlaceholder(playerBoard, shipPlaceholder);
      }
    }
  });

  playerBoard.addEventListener('mouseleave', () => {
    // hide placeholder when leaving board area
    shipPlaceholder = hideShipPlaceholder(shipPlaceholder);
  });
};

// #############################################################
const initDisplay = function initDisplay() {
  // create start screen
  document.body.setAttribute('class', 'bg-gradient-to-b h-screen from-slate-950 to-slate-900');
  const startScreen = createStartScreen();
  document.body.appendChild(startScreen);

  // start button loads game
  startScreen.querySelector('#start-button').addEventListener('click', loadPlayScreen);
};

// #############################################################
export default initDisplay;
