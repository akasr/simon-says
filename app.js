// $ and $$ are shortcuts for querySelector and querySelectorAll
const $ = function () {
  return document.querySelector.apply(document, arguments);
};
const $$ = function () {
  return document.querySelectorAll.apply(document, arguments);
};

// Add custom methods to HTMLElement prototype
// These methods are used to add and remove event listeners
HTMLElement.prototype.on = HTMLElement.prototype.addEventListener;
HTMLElement.prototype.off = HTMLElement.prototype.removeEventListener;
// and to select elements
HTMLElement.prototype.$ = function (s) {
  return this.querySelector(s);
};
HTMLElement.prototype.$$ = function (s) {
  return this.querySelectorAll(s);
};

const actiobBtn = $("#action");
const playboard = $(".playboard");
// When the start btn is clicked, the playboard is displayed
actiobBtn.on("click", (e) => {
  e.target.style.visibility = "hidden";
  playboard.style.display = "grid";
  scrollBy(0, 1000);
  isStarted = true;
  resetState();
  selectBox();
});

// Adjust the height of the playboard to fit the window
function adjustPlayboardHeight() {
  const headerHeight = $("header").offsetHeight;
  playboard.style.height = `${window.outerHeight - headerHeight}px`;
}
window.onload = adjustPlayboardHeight;
window.onresize = adjustPlayboardHeight;

/*
 *
 *
 *  Game logic Implementation Ahead
 *
 *
 */

// State of the game
let memArr = []; // Memory array
let userArr = []; // User input array
let level = 1;
let isStrict = false; // Strict mode: True - Hints On | False - Hints Off
let clicks = 0;
let isStarted = false;
let score = 0;
let memViewTime = 40000; // Total memory view time
let inputTime = Infinity; // Total input time | Infinity - No time limit, till level 5 | 10000 - 10 seconds
let lives = 1;
let isMemViewActive = false; // Memory view active: True - Yes | False - No
let flashModes = ["flash", "flash-reverse", "flash-ignore"];
let boxPositions = {};

// Flash the selected box for a given time period
const flashBox = (box, color) => {
  box.style.border = `10px solid ${color}`;
  setTimeout(() => {
    box.style.border = "none";
  }, 2000);
};
// Select a random box
const selectBox = () => {
  const box = tiles[Math.floor(Math.random() * tiles.length)];
  const flashMode = flashModes[Math.floor(Math.random() * flashModes.length)];
  console.log(flashMode);
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

const tiles = $$(".tile");
tiles.forEach((tile) => {
  tile.on("click", (e) => {
    userArr.push(e.target.id);
    checkUserInput();
    console.log(userArr);
  });
});

// Check if the user input is correct
const checkUserInput = () => {
  clicks++;
  if (userArr[clicks - 1] !== memArr[clicks - 1]) {
    lives--;
    updateLives();
    if (!lives) {
      console.log("Game Over");
      actiobBtn.style.visibility = "visible";
      actiobBtn.textContent = "Restart";
      playboard.style.display = "none";
      $("#message").textContent = "Game Over";
      return;
    }
    userArr = [];
    clicks = 0;
  } else {
    score += 1;
  }

  if (clicks === memArr.length) {
    score += 10 * level;
    level++;
    clicks = 0;
    userArr = [];
    selectBox();
  }
  updateScore();
  updateLevel();
};

// Reset the game state
const resetState = () => {
  memArr = [];
  userArr = [];
  level = 1;
  score = 0;
  clicks = 0;
  isStarted = false;
  lives = 1;
  isMemViewActive = false;
  updateScore();
  updateLevel();
  updateLives();
  $("#message").textContent = "";
};

const updateScore = () => {
  $("#score-value").textContent = score;
};
const updateLevel = () => {
  $("#level-value").textContent = level;
};
const updateLives = () => {
  $("#lives-value").textContent = "🫀".repeat(lives);
};