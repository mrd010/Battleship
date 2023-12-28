import { appendChildren, createContainer, createElementWithClasses } from './ElementCreator';

export const createStartScreen = function createStartScreen() {
  const startScreen = createContainer('grid h-screen items-center justify-center', 'start-screen');
  const startBtn = createElementWithClasses(
    'button',
    'rounded-full bg-amber-400 px-4 py-2 font-bold text-slate-900 hover:bg-amber-300 active:bg-amber-500',
    ['id', 'start-button']
  );
  startBtn.textContent = 'Start Battleship';
  startScreen.appendChild(startBtn);
  return startScreen;
};

const createPlayerField = function createPlayerField(boardWidth) {
  const playerField = createContainer('grid grid-rows-[auto_minmax(0,1fr)] self-stretch');
  // header
  const playerFieldHeader = createContainer('field-header p-2 m-2');
  appendChildren(playerFieldHeader, [
    createElementWithClasses('h2', 'title text-center text-slate-50 text-lg font-bold'),
    createElementWithClasses('h3', 'desc text-center text-slate-100 text-md font-bold'),
  ]);
  playerField.appendChild(playerFieldHeader);

  // player board
  const playerBoard = createContainer(
    `game-board grid place-self-center border-2 rounded-md border-slate-200`,
    'player-board'
  );
  playerBoard.style.gridTemplateRows = `repeat(${boardWidth}, minmax(0, 1fr))`;
  playerBoard.style.gridTemplateColumns = `repeat(${boardWidth}, minmax(0, 1fr))`;
  for (let x = 0; x < boardWidth; x += 1) {
    for (let y = 0; y < boardWidth; y += 1) {
      playerBoard.appendChild(
        createElementWithClasses(
          'button',
          'w-6 h-6 bg-slate-50/5 border-[1px] border-slate-50/10',
          ['data-x', x],
          ['data-y', y]
        )
      );
    }
  }
  playerField.appendChild(playerBoard);
  return playerField;
};

export const createPlayScreen = function createPlayScreen(shipsSetup, boardWidth) {
  // play screen page ########################
  const playScreen = createContainer(
    'grid grid-rows-[auto_auto_1fr] min-h-screen items-start',
    'play-screen'
  );
  // header
  const playScreenHeader = createElementWithClasses('header', 'p-2 bg-amber-400 border-b-2');
  const playScreenHeaderTitle = createElementWithClasses(
    'h1',
    'text-slate-900 font-extrabold font-display text-2xl text-center'
  );
  playScreenHeaderTitle.textContent = 'Battleship';
  playScreenHeader.appendChild(playScreenHeaderTitle);
  playScreen.appendChild(playScreenHeader);

  // ships select menu section ########################
  const shipsMenu = createContainer('flex flex-wrap flex-row p-4 gap-2 border-b-2', 'ships-menu');
  // create a ship button for each ship in shipsSetup
  // with ship name and ship length provided
  // each ship takes length amount of grid cells
  shipsSetup.forEach((ship) => {
    const shipBtn = createElementWithClasses(
      'button',
      `ship-button border-2 grid items-stretch rounded-md overflow-hidden relative`,
      ['data-ship-name', ship.name],
      ['data-ship-length', ship.length]
    );
    shipBtn.style.height = `2rem`;
    shipBtn.style.width = `${2 * ship.length}rem`;
    shipBtn.style.gridTemplateColumns = `repeat(${ship.length}, minmax(0, 1fr))`;
    shipBtn.style.gridTemplateRows = `repeat(1, minmax(0, 1fr))`;
    const shipName = createContainer(
      'ship-name text-slate-50 z-10 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm'
    );
    shipName.textContent = ship.name;
    shipBtn.appendChild(shipName);
    // create ship cells with length amount
    for (let i = 0; i < ship.length; i += 1) {
      shipBtn.appendChild(createContainer('ship-part odd:bg-slate-700 even:bg-slate-600'));
    }
    shipsMenu.appendChild(shipBtn);
  });
  playScreen.appendChild(shipsMenu);

  // create play fields section ########################
  // player field
  const playerField = createPlayerField(boardWidth);
  playerField.setAttribute('id', 'player-board');
  playerField.querySelector('.field-header .title').textContent = 'Place your ships in board';
  playerField.querySelector('.field-header .desc').textContent = 'Press R for rotate';
  // opponent board
  const opponentField = createPlayerField(boardWidth);
  opponentField.setAttribute('id', 'opponent-board');
  opponentField.classList.add('hidden');
  // append
  appendChildren(playScreen, [playerField, opponentField]);

  return playScreen;
};
