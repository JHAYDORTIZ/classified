const ADMIN_PASSWORD = "pizza17";
const USER_PASSWORD = "4tanyatapes";

/* SOUNDS */
const bootSound = new Audio("sounds/boot.mp3");
const clickSound = new Audio("sounds/click.mp3");
const errorSound = new Audio("sounds/error.mp3");

bootSound.volume = 0.7;
clickSound.volume = 0.25;
errorSound.volume = 0.5;

/* BOOT (fix navegadores) */
window.addEventListener("click", function bootOnce() {
  bootSound.play().catch(() => {});
  window.removeEventListener("click", bootOnce);
});

/* CLOCK */
setInterval(() => {
  const d = new Date();
  document.getElementById("clock").textContent =
    d.getHours() + ":" + d.getMinutes().toString().padStart(2, "0");
}, 1000);

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

  if (input === ADMIN_PASSWORD || input === USER_PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("desktop").classList.remove("hidden");
  } else {
    errorSound.currentTime = 0;
    errorSound.play();
    document.getElementById("error").textContent = "ACCESS DENIED";
  }
}

/* WINDOWS */
function openWindow(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closeWindow(id) {
  document.getElementById(id).classList.add("hidden");
}

/* SEARCH */
function searchFiles() {
  const q = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll(".icon").forEach(i => {
    i.style.display = i.textContent.toLowerCase().includes(q) ? "block" : "none";
  });
}

/* SNAKE */
let snake, dir, food, ctx, loop;

function startSnake() {
  const c = document.getElementById("game");
  ctx = c.getContext("2d");

  snake = [{ x: 5, y: 5 }];
  dir = { x: 1, y: 0 };
  food = { x: 10, y: 10 };

  document.addEventListener("keydown", move);

  clearInterval(loop);
  loop = setInterval(game, 150);
}

function game() {
  let head = {
    x: snake[0].x + dir.x,
    y: snake[0].y + dir.y
  };

  snake.unshift(head);
  snake.pop();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 300, 300);

  ctx.fillStyle = "green";
  snake.forEach(s => ctx.fillRect(s.x * 15, s.y * 15, 14, 14));

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 15, food.y * 15, 14, 14);
}

function move(e) {
  if (e.key === "ArrowUp") dir = { x: 0, y: -1 };
  if (e.key === "ArrowDown") dir = { x: 0, y: 1 };
  if (e.key === "ArrowLeft") dir = { x: -1, y: 0 };
  if (e.key === "ArrowRight") dir = { x: 1, y: 0 };
}
