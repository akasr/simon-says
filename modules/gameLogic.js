import {
  selectBox,
  endGame,
  updateLives,
  updateLevel,
  updateScore,
  updateInputTimerUI,
  updateMemoryTimerUI,
} from "./ui.js";
import { increaseLife, bonusTime } from "./features.js";
import { $ } from "./shortcut.js";

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
  state.memoryInterval = null;
  state.inputInterval = null;
  state.memViewTime = 40000;
  state.inputTime = 59000;
  state.isStrict = false;
  state.boxPositions = {};
  state.currFlashMode = null;
  state.withoutMistake = 0;
  $("#memoryContainer").innerHTML = "";
  updateLevel(state.level);
  updateScore(state.score);
  updateLives(state.lives);
  updateMemoryTimerUI();
  updateInputTimerUI();
};

// Start the game
export const startGame = () => {
  resetState();
  const state = getState();
  state.isStarted = true;
  selectBox();
};

// Check the user input and update the score and level accordingly OR end the game
const wrongInput = () => {
  const state = getState();
  state.lives--;
  state.withoutMistake = 0;
  updateLives(state.lives);
  if (!state.lives) {
    endGame();
    clearInterval(state.memoryInterval);
    clearInterval(state.inputInterval);
    return;
  }
  state.userArr = [];
  state.clicks = 0;
};

export const checkUserInput = () => {
  const state = getState();
  state.clicks++;
  if (
    state.userArr[state.clicks - 1] !== state.memArr[state.clicks - 1] &&
    state.currFlashMode !== "flash-reverse"
  ) {
    wrongInput();
    return;
  } else if (
    state.userArr[state.clicks - 1] !==
      state.memArr[state.memArr.length - state.clicks] &&
    state.currFlashMode === "flash-reverse"
  ) {
    wrongInput();
    return;
  } else {
    state.score += 1;
  }

  if (state.clicks === state.memArr.length) {
    bonusTime();
    state.withoutMistake++;
    state.score += 10 * state.level;
    state.level++;
    state.clicks = 0;
    state.userArr = [];
    clearInterval(state.inputInterval);
    selectBox();
    increaseLife();
  }
  updateScore(state.score);
  updateLevel(state.level);
};
