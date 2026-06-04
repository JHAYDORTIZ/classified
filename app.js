const ADMIN_PASSWORD = "pizza17";
const USER_PASSWORD = "4tanyatapes";

/* SOUNDS */
const bootSound = new Audio("sounds/boot.mp3");
const clickSound = new Audio("sounds/click.mp3");
const errorSound = new Audio("sounds/error.mp3");

bootSound.volume = 0.7;
clickSound.volume = 0.25;
errorSound.volume = 0.5;

/* ENTER EN LOGIN (TECLADO) */
document.getElementById("password").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    login();
  }
});

/* CLOCK */
setInterval(() => {
  const d = new Date();
  document.getElementById("clock").textContent =
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}, 1000);

/* LOGIN */
function login() {
  const input = document.getElementById("password").value;

  if (input === ADMIN_PASSWORD || input === USER_PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("desktop").classList.remove("hidden");

    // boot SOLO después del login
    bootSound.play().catch(() => {});
  } else {
    errorSound.play();
    document.getElementById("error").textContent = "ACCESS DENIED";
  }
}

/* CLICK SOUND */
document.addEventListener("click", (e) => {
  if (e.target.closest(".icon") || e.target.tagName === "BUTTON") {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});

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
  const box = document.getElementById("searchResults");
  const win = document.getElementById("searchWindow");

  let results = [];

  document.querySelectorAll(".icon").forEach(i => {
    if (i.textContent.toLowerCase().includes(q)) {
      results.push(i.textContent);
    }
  });

  if (!q) {
    win.classList.add("hidden");
    return;
  }

  win.classList.remove("hidden");
  box.innerHTML = results.length
    ? results.map(r => `<p>${r}</p>`).join("")
    : "<p>No results found</p>";
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

  if (head.x < 0 || head.y < 0 || head.x > 19 || head.y > 19) {
    clearInterval(loop);
    alert("TRY AGAIN");
    startSnake();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20)
    };
  } else {
    snake.pop();
  }

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
