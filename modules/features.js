import { getState } from "./gameLogic.js";
import {
  updateLives,
  updateMemoryTimerUI,
  updateInputTimerUI,
  endGame,
  showClue,
} from "./ui.js";

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
export const increaseLife = () => {
  const { withoutMistake } = getState();
  if (withoutMistake === 10) {
    getState().lives++;
    updateLives(getState().lives);
    getState().withoutMistake = 0;
  }
};

//Bonus time for every 5th level if no mistake is done
export const bonusTime = () => {
  const state = getState();
  if (state.withoutMistake % 5 === 0 && state.level > 5) {
    state.inputTime += 5000;
    state.memViewTime += 1000;
    updateInputTimerUI();
    updateMemoryTimerUI();
  }
};

// Relay hints to the user
export const relayHints = () => {
  const state = getState();
  let clue = "";
  switch (state.level) {
    case 1:
      clue = "Click the flashed element";
      break;
    case 2:
      clue = "Remember the order of the elements";
      break;
    case 3:
      clue =
        "Black - Ignore, White - Start to Current, Any other color - Current to Start";
      break;
    case 4:
      clue =
        "When in confusion, look into memory by clicking on the black strip";
      break;
    case 5:
      clue = "1 mistake cost 1 live";
      break;
    case 6:
      clue = "Input within the time limit";
      break;
  }
  showClue(clue);
};
