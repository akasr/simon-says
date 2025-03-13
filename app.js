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


const actiobBtn = $('#action');
const playboard = $('.playboard');
// When the start btn is clicked, the playboard is displayed
actiobBtn.on('click', (e) => {
  e.target.style.display = 'none';
  playboard.style.display = 'grid';
  scrollBy(0, 1000);
});

function adjustPlayboardHeight() {
  const headerHeight = $("header").offsetHeight;
  playboard.style.height = `${window.innerHeight - headerHeight}px`;
}

window.onload = adjustPlayboardHeight;
window.onresize = adjustPlayboardHeight;