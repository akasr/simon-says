import { $, $$ } from "./shortcut.js";
import { getState } from "./gameLogic.js";

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
  state.flashMode = flashMode;
  switch (flashMode) {
    case "flash":
      flashBox(box, "white");
      memArr.push(box.id);
      break;
    case "flash-reverse":
      const colors = ["red", "green", "blue", "yellow"].filter(
        (color) => color !== box.id
      );
      const color = colors[Math.floor(Math.random() * colors.length)];
      flashBox(box, color);
      memArr.push(box.id);
      break;
    case "flash-ignore":
      if (memArr.length) {
        flashBox(box, box.id);
      } else {
        flashBox(box, "white");
        memArr.push(box.id);
      }
      break;
    default:
      flashBox(box, "flash");
      memArr.push(box.id);
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
