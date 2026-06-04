const PASSWORD = "4tanyatapes";

/* SOUNDS */
const clickSound = new Audio("sounds/click.mp3");
const errorSound = new Audio("sounds/error.mp3");
const bootSound = new Audio("sounds/boot.mp3");

/* BOOT */
window.addEventListener("load", () => {
  bootSound.play().catch(() => {});
  startClock();
});

/* CLOCK */
function startClock() {
  setInterval(() => {
    const now = new Date();
    document.getElementById("clock").textContent =
      now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");
  }, 1000);
}

/* CLICK GLOBAL */
document.addEventListener("click", (e) => {
  if (e.target.closest(".icon") || e.target.tagName === "BUTTON") {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});

/* LOGIN */
function login() {
  const input = document.getElementById("password").value;

  if (input === PASSWORD) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("desktop").classList.remove("hidden");
  } else {
    document.getElementById("error").textContent = "ACCESS DENIED";
    errorSound.currentTime = 0;
    errorSound.play();
  }
}

/* WINDOWS */
function openWindow(id) {
  const el = document.getElementById(id);
  el.classList.remove("hidden");
}

function closeWindow(id) {
  document.getElementById(id).classList.add("hidden");
}

/* SNAKE */
let snake, dir, food, ctx, interval;

function startSnake() {
  const canvas = document.getElementById("snakeCanvas");
  ctx = canvas.getContext("2d");

  snake = [{ x: 5, y: 5 }];
  dir = { x: 1, y: 0 };
  food = randomFood();

  document.addEventListener("keydown", moveSnake);

  clearInterval(interval);
  interval = setInterval(game, 150);
}

function game() {
  let head = {
    x: snake[0].x + dir.x,
    y: snake[0].y + dir.y
  };

  if (head.x < 0 || head.y < 0 || head.x > 19 || head.y > 19) {
    resetSnake();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = randomFood();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 300, 300);

  ctx.fillStyle = "green";
  snake.forEach(s => ctx.fillRect(s.x * 15, s.y * 15, 14, 14));

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 15, food.y * 15, 14, 14);
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
  };
}

function moveSnake(e) {
  if (e.key === "ArrowUp") dir = { x: 0, y: -1 };
  if (e.key === "ArrowDown") dir = { x: 0, y: 1 };
  if (e.key === "ArrowLeft") dir = { x: -1, y: 0 };
  if (e.key === "ArrowRight") dir = { x: 1, y: 0 };
}

function resetSnake() {
  clearInterval(interval);
  startSnake();
}
