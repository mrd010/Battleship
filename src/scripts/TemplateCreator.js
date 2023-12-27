import { createContainer, createElementWithClasses } from './ElementCreator';

export const createStartScreen = function createStartScreen() {
  const startScreen = createContainer(
    'hidden grid h-screen items-center justify-center',
    'start-screen'
  );
  const startBtn = createElementWithClasses(
    'button',
    'rounded-full bg-amber-400 px-4 py-2 font-bold text-slate-900',
    ['id', 'start-button']
  );
  startScreen.appendChild(startBtn);
  return startScreen;
};

export const createPlayScreen = function createPlayScreen() {};
