import State from "./modules/State.js";
import { $, $$ } from "./modules/shortcut.js";
import { adjustPlayboardHeight, showHideMemory } from "./modules/ui.js";
import { startGame, checkUserInput, getState, updateMemTime } from "./modules/gameLogic.js";


// Initialize global object
window.app = {};
// State of the game
window.app.state = State;

// Adjust the height of the playboard to fit the window
window.onload = adjustPlayboardHeight;
window.onresize = adjustPlayboardHeight;

// When the start btn is clicked, the playboard is displayed
const actionBtn = $("#action");
actionBtn.on("click", (e) => {
  e.target.style.visibility = "hidden";
  $('.playboard').style.display = "grid";
  $('.message').textContent = "";
  scrollBy(0, 1000);
  startGame();
});

// When a tile is clicked, the userArr is updated
const tiles = $$(".tile");
tiles.forEach((tile) => {
  const state = getState();
  tile.on("click", (e) => {
    state.userArr.push(e.target.id);
    checkUserInput();
    console.log(state.userArr);
  });
});

// When the memoryContainer is double clicked, the tiles are shown or hidden
$("#memoryContainer").on("click", function () {
  const state = getState();
  state.isMemViewActive = !state.isMemViewActive;
  if(state.isMemViewActive && state.memViewTime > 0){
    state.memoryInterval = setInterval(updateMemTime, 1000);
  } else {
    clearInterval(state.memoryInterval);
  }
  showHideMemory();
  console.log("clicked");
});