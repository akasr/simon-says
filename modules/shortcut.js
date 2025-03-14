// $ and $$ are shortcuts for querySelector and querySelectorAll
export const $ = function () {
  return document.querySelector.apply(document, arguments);
};
export const $$ = function () {
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
