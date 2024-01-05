import { appendChildren, createContainer, createElementWithClasses } from './ElementCreator';

// ####################################################################################
export const createStartScreen = function createStartScreen() {
  const startScreen = createContainer('grid h-screen items-center justify-center', 'start-screen');
  const startBtn = createElementWithClasses(
    'button',
    'rounded-full bg-amber-400 px-4 py-2 font-bold text-xl text-slate-900 hover:bg-amber-300 active:bg-amber-500',
    ['id', 'start-button']
  );
  startBtn.textContent = 'Start Battleship';
  startScreen.appendChild(startBtn);
  return startScreen;
};

// ####################################################################################
const createPlayerField = function createPlayerField() {
  const playerField = createContainer('grid grid-rows-[auto_minmax(0,1fr)] self-stretch gap-4');
  // header
  const playerFieldHeader = createContainer('field-header p-4 m-4');
  appendChildren(playerFieldHeader, [
    createElementWithClasses('h2', 'title text-center text-slate-50 text-2xl font-extrabold'),
    createElementWithClasses('h3', 'desc text-center text-slate-100 text-md font-bold'),
  ]);
  playerField.appendChild(playerFieldHeader);

  // player board
  const playerBoard = createContainer(
    `game-board grid place-self-center border-2 rounded-md border-slate-200`
  );
  playerBoard.style.gridTemplateRows = `repeat(10, minmax(0, 1fr))`;
  playerBoard.style.gridTemplateColumns = `repeat(10, minmax(0, 1fr))`;
  for (let row = 0; row < 10; row += 1) {
    for (let col = 0; col < 10; col += 1) {
      const gridCell = createElementWithClasses(
        'button',
        'w-10 h-10 bg-slate-50/5 border-[1px] border-slate-50/10',
        ['data-row', row],
        ['data-col', col]
      );
      gridCell.style.gridArea = `${row + 1} / ${col + 1} / span 1 / span 1`;
      playerBoard.appendChild(gridCell);
    }
  }
  playerField.appendChild(playerBoard);
  return playerField;
};

// ####################################################################################
export const createPlayScreen = function createPlayScreen(shipsSetup) {
  // play screen page ########################
  const playScreen = createContainer(
    'grid grid-rows-[auto_auto_1fr] grid grid-cols-[1fr_1fr] min-h-screen items-start',
    'play-screen'
  );
  // header
  const playScreenHeader = createElementWithClasses(
    'header',
    'p-2 bg-amber-400 border-b-2 col-span-2'
  );
  const playScreenHeaderTitle = createElementWithClasses(
    'h1',
    'text-slate-900 font-extrabold font-display text-4xl text-center'
  );
  playScreenHeaderTitle.textContent = 'Battleship';
  playScreenHeader.appendChild(playScreenHeaderTitle);
  playScreen.appendChild(playScreenHeader);

  // ships select menu section ########################
  const shipsMenu = createContainer(
    'flex flex-wrap col-span-2 flex-row p-4 gap-3 border-b-2',
    'ships-menu'
  );
  // create a ship button for each ship in shipsSetup
  // with ship name and ship length provided
  // each ship takes length amount of grid cells
  shipsSetup.forEach((ship, index) => {
    const shipBtn = createContainer('ship-button grid items-stretch rounded-sm');
    const shipRadioBtn = createElementWithClasses(
      'input',
      'peer hidden',
      ['type', 'radio'],
      ['id', `ship${index}`],
      ['name', `ships`],
      ['data-ship-name', ship.name],
      ['data-ship-length', ship.length]
    );
    const shipLabel = createElementWithClasses(
      'label',
      `grid border-2 peer-checked:ring-2 peer-disabled:opacity-30 opacity-80 peer-checked:opacity-100 cursor-pointer ring-red-500 rounded-md overflow-hidden relative text-slate-50 text-sm text-center`,
      ['for', `ship${index}`],
      ['data-ship-name', ship.name],
      ['data-ship-length', ship.length]
    );
    shipLabel.style.height = `2.5rem`;
    shipLabel.style.width = `${2.5 * ship.length}rem`;
    shipLabel.style.gridTemplateColumns = `repeat(${ship.length}, minmax(0, 1fr))`;
    shipLabel.style.gridTemplateRows = `repeat(1, minmax(0, 1fr))`;
    const shipName = createContainer(
      'ship-name text-slate-50 z-10 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase'
    );
    shipName.textContent = ship.name;
    shipLabel.appendChild(shipName);
    // create ship cell parts with length amount
    for (let i = 0; i < ship.length; i += 1) {
      shipLabel.appendChild(createContainer('ship-part odd:bg-slate-700 even:bg-slate-600'));
    }

    appendChildren(shipBtn, [shipRadioBtn, shipLabel]);
    shipsMenu.appendChild(shipBtn);
  });
  playScreen.appendChild(shipsMenu);

  // create play fields section ####################################
  // player field
  const playerField = createPlayerField();
  playerField.classList.add('border-r-2');
  playerField.setAttribute('id', 'player-field');
  playerField.querySelector('.field-header .title').textContent = 'Place your ships in board';
  playerField.querySelector('.field-header .desc').textContent =
    'Select Ship and Place it . Press R for rotate';
  // opponent board
  const opponentField = createPlayerField();
  opponentField.setAttribute('id', 'opponent-field');
  opponentField.querySelector('.field-header .title').textContent = 'Player2 (AI)';
  opponentField.classList.add('opacity-20');
  // append
  appendChildren(playScreen, [playerField, opponentField]);

  return playScreen;
};
// ##################################################################
export const createGameOverScreen = function createGameOverScreen(winnerName) {
  const bgOverlay = createContainer('fixed w-full h-full bg-slate-900/50 grid items-center');
  const gameOverContainer = createContainer('bg-red-700 text-slate-50 border-2', 'game-over p-4');
  const title = createElementWithClasses(
    'h3',
    'title text-xl font-bold text-center font-display p-2'
  );
  title.textContent = 'Game Over';
  const desc = createElementWithClasses('p', 'desc text-center text-2xl font-bold p-2');
  desc.textContent = `${winnerName} won`;
  appendChildren(gameOverContainer, [title, desc]);
  bgOverlay.appendChild(gameOverContainer);
  return bgOverlay;
};
