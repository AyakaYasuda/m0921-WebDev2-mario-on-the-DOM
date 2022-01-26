function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

let currentLeft = 100;
let currentTop = 100;
let score = 0;
let direction = true;
const step = 20;

const mario = document.querySelector('#avatar');
const coin = document.querySelector('#coin');
const scoreboard = document.querySelector('#scoreboard');

function flipMario(direction) {
  if (!direction) {
    mario.style.transform = 'scale(-1, 1)';
  } else {
    mario.style.transform = 'scale(1, 1)';
  }
}

window.addEventListener('keydown', e => {
  e.preventDefault();

  // Get Mario moving around the screen
  switch (e.key) {
    case 'ArrowRight':
      currentLeft < window.innerWidth - 100
        ? (currentLeft += step)
        : currentLeft;
      mario.style.left = `${currentLeft}px`;
      direction = true;
      flipMario(direction);
      break;
    case 'ArrowLeft':
      currentLeft > 0 ? (currentLeft -= step) : currentLeft;
      mario.style.left = `${currentLeft}px`;
      mario.style.transform = 'scale(-1, 1)';
      direction = false;
      flipMario(direction);
      break;
    case 'ArrowUp':
      currentTop > 0 ? (currentTop -= step) : currentTop;
      mario.style.top = `${currentTop}px`;
      break;
    case 'ArrowDown':
      currentTop < window.innerHeight - 100 ? (currentTop += step) : currentTop;
      mario.style.top = `${currentTop}px`;
      break;

    default:
      console.log("can't move...");
  }

  // Get coin move randomly in the screen
  if (isTouching(mario, coin)) {
    const height = Math.floor(Math.random() * (window.innerHeight - 100));
    const width = Math.floor(Math.random() * (window.innerWidth - 100));

    coin.style.top = `${height}px`;
    coin.style.left = `${width}px`;

    score += 10;

    scoreboard.textContent = `Your Score : ${score}`;
  }
});
