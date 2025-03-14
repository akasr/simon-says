import {
  selectBox,
  endGame,
  updateLives,
  updateLevel,
  updateScore,
} from "./ui.js";

export const getState = () => window.app.state;

// Reset the game state
const resetState = () => {
  const state = getState();
  state.memArr.length = 0;
  state.userArr.length = 0;
  state.level = 1;
  state.score = 0;
  state.clicks = 0;
  state.isStarted = false;
  state.lives = 1;
  state.isMemViewActive = false;
  updateLevel(state.level);
  updateScore(state.score);
  updateLives(state.lives);
};

// Start the game
export const startGame = () => {
  resetState();
  const state = getState();
  state.isStarted = true;
  selectBox();
};

// Check the user input and update the score and level accordingly OR end the game
export const checkUserInput = () => {
  const state = getState();
  state.clicks++;
  if (state.userArr[state.clicks - 1] !== state.memArr[state.clicks - 1]) {
    state.lives--;
    updateLives(state.lives);
    if (!state.lives) {
      endGame();
      return;
    }
    state.userArr = [];
    state.clicks = 0;
  } else {
    state.score += 1;
  }

  if (state.clicks === state.memArr.length) {
    state.score += 10 * state.level;
    state.level++;
    state.clicks = 0;
    state.userArr = [];
    selectBox();
  }
  updateScore(state.score);
  updateLevel(state.level);
};
