const $ = function () {
  return document.querySelector.apply(this, arguments);
};
const $$ = function () {
  return document.querySelectorAll.apply(this, arguments);
};
HTMLElement.prototype.on = HTMLElement.prototype.addEventListener;
HTMLElement.prototype.off = HTMLElement.prototype.removeEventListener;
HTMLElement.prototype.$ = function (s) {
  return this.querySelector(s);
};
HTMLElement.prototype.$$ = function (s) {
  return this.querySelectorAll(s);
};
