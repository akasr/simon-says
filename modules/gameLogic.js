import {
  selectBox,
  endGame,
  updateLives,
  updateLevel,
  updateScore,
  showHideMemory,
  updateInputTimerUI,
  updateMemoryTimerUI,
} from "./ui.js";
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
  if (state.userArr[state.clicks - 1] !== state.memArr[state.clicks - 1] && state.currFlashMode !== "flash-reverse") {
    wrongInput();
    return;
  } else if(state.userArr[state.clicks - 1] !== state.memArr[state.memArr.length - state.clicks] && state.currFlashMode === "flash-reverse") {
    wrongInput();
    return;
  }
  else {
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

// Update memory time
export const updateMemTime = () => {
  const state = getState();
  state.memViewTime -= 1000;
  state.inputTime -= 2000;

  if (state.memViewTime === 0) {
    clearInterval(state.memoryInterval);
    state.isMemViewActive = false;
    showHideMemory();
  }
  updateMemoryTimerUI();
};

// Update input timer
export const updateInputTimer = () => {
  const state = getState();
  state.inputTime -= 1000;
  if (state.inputTime === 0) {
    clearInterval(state.inputInterval);
    endGame();
  }
  updateInputTimerUI();
};

// Increase life if mistake is not done for last 10 levels
const increaseLife = () => {
  const {withoutMistake} = getState();
  if (withoutMistake === 10) {
    getState().lives++;
    updateLives(getState().lives);
    getState().withoutMistake = 0;
  }
}

//Bonus time for every 5th level if no mistake is done
const bonusTime = () => {
  const state = getState();
  if(state.withoutMistake%5 === 0 && state.level > 5) {
    state.inputTime += 5000;
    state.memViewTime += 1000;
    updateInputTimerUI();
    updateMemoryTimerUI();
  }
}