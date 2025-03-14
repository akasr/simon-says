import { $, $$ } from "./shortcut.js";
import { getState, updateInputTimer } from "./gameLogic.js";

const playboard = $(".playboard");
const tiles = $$(".tile");

// Adjust the height of the playboard to fit the window
export function adjustPlayboardHeight() {
  const headerHeight = $("header").offsetHeight;
  playboard.style.height = `${window.outerHeight - headerHeight}px`;
}

// Flash the selected box for a given time period
const flashBox = (box, color) => {
  box.style.border = `10px solid ${color}`;
  setTimeout(() => {
    box.style.border = "none";
  }, 2000);
};

// Select a random box
export const selectBox = () => {
  const flashModes = ["flash", "flash-reverse", "flash-ignore"];
  const box = tiles[Math.floor(Math.random() * tiles.length)];
  const flashMode = flashModes[Math.floor(Math.random() * flashModes.length)];
  const state = getState();
  const { memArr } = state;
  state.currFlashMode = flashMode;
  switch (flashMode) {
    case "flash":
      flashBox(box, "white");
      memArr.push(box.id);
      $(
        "#memoryContainer"
      ).innerHTML += `<div class="memory-tile ${box.id} hide"></div>`;
      break;
    case "flash-reverse":
      const colors = ["red", "green", "blue", "yellow"].filter(
        (color) => color !== box.id
      );
      const color = colors[Math.floor(Math.random() * colors.length)];
      flashBox(box, color);
      $(
        "#memoryContainer"
      ).innerHTML += `<div class="memory-tile ${box.id} hide"></div>`;
      memArr.push(box.id);
      break;
    case "flash-ignore":
      if (memArr.length) {
        flashBox(box, "black");
      } else {
        flashBox(box, "white");
        $(
          "#memoryContainer"
        ).innerHTML += `<div class="memory-tile ${box.id} hide"></div>`;
        memArr.push(box.id);
      }
      break;
    default:
      flashBox(box, "flash");
      $(
        "#memoryContainer"
      ).innerHTML += `<div class="memory-tile ${box.id} hide"></div>`;
      memArr.push(box.id);
  }
  if (state.level > 5) {
    state.inputInterval = setInterval(updateInputTimer, 1000);
    state.inputTime -= (state.level - 5) % 3 == 0 ? 3000 : 0;
  }
  console.log(memArr);
};

// End Game
export const endGame = () => {
  const actionBtn = $("#action");
  actionBtn.style.visibility = "visible";
  actionBtn.textContent = "Restart";
  playboard.style.display = "none";
  $(".message").textContent = "Game Over!";
};

// Update the score
export const updateScore = (score) => {
  $("#score-value").textContent = score;
};
// Update the level
export const updateLevel = (level) => {
  $("#level-value").textContent = level;
};
// Update the lives
export const updateLives = (lives) => {
  $("#lives-value").textContent = "🫀".repeat(lives);
};

// Show memory
export const showHideMemory = () => {
  const state = getState();
  if (state.memViewTime === 0 || !state.isMemViewActive) {
    $$(".memory-tile").forEach((tile) => {
      tile.classList.add("hide");
    });
  } else {
    $$(".memory-tile").forEach((tile) => {
      tile.classList.remove("hide");
    });
  }
};
// Update memory time
export const updateMemoryTimerUI = () => {
  const state = getState();
  $("#memory-time").textContent = `00:${
    state.memViewTime / 1000 < 10
      ? `0${state.memViewTime / 1000}`
      : state.memViewTime / 1000
  }`;
  if (state.level > 5) {
    $("#timer-value").textContent = `00:${
      state.inputTime / 1000 < 10
        ? `0${state.inputTime / 1000}`
        : state.inputTime / 1000
    }`;
  }
};

// Update input timer
export const updateInputTimerUI = () => {
  const state = getState();
  $("#timer-value").textContent = `00:${
    state.inputTime / 1000 < 10
      ? `0${state.inputTime / 1000}`
      : state.inputTime / 1000
  }`;
};
