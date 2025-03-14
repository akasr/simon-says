import { $$ } from './shortcut.js';

function isOverlapping(element1, element2) {
  // Get the bounding rectangles of both elements
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  // Check if the rectangles overlap
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function positionBox1(box) {
  const top = Math.floor(Math.random() * 80);
  const left = Math.floor(Math.random() * 80);

  box.style.top = `${top}%`;
  box.style.left = `${left}%`;
}

function positionBox2(box1, box2) {
  let overlap = true;

  while (overlap) {
    positionBox1(box2);
    overlap = isOverlapping(box1, box2);
  }
}

function positionBox3(box1, box2, box3) {
  let overlap = true;

  while (overlap) {
    positionBox1(box3);
    overlap = isOverlapping(box1, box3) || isOverlapping(box2, box3);
  }
}

function positionBox4(box1, box2, box3, box4) {
  let overlap = true;

  while (overlap) {
    positionBox1(box4);
    overlap = isOverlapping(box1, box4) || isOverlapping(box2, box4) || isOverlapping(box3, box4);
  }
}

export function positionBoxes() {
  const [box1, box2, box3, box4] = $$('.tile');

  positionBox1(box1);
  positionBox2(box1, box2);
  positionBox3(box1, box2, box3);
  positionBox4(box1, box2, box3, box4);
}