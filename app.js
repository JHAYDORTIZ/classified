const ADMIN_PASSWORD = "pizza17";
const USER_PASSWORD = "4tanyatapes";

/* SOUNDS */
const bootSound = new Audio("sounds/boot.mp3");
const clickSound = new Audio("sounds/click.mp3");
const errorSound = new Audio("sounds/error.mp3");

/* LOGIN ENTER */
document.getElementById("password").addEventListener("keydown", e => {
  if (e.key === "Enter") login();
});

/* CLOCK */
setInterval(() => {
  const d = new Date();
  document.getElementById("clock").textContent =
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}, 1000);

/* LOGIN */
function login() {
  const v = document.getElementById("password").value;

  if (v === ADMIN_PASSWORD || v === USER_PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("desktop").classList.remove("hidden");

    bootSound.play().catch(()=>{});
  } else {
    errorSound.play();
    document.getElementById("error").textContent = "ACCESS DENIED";
  }
}

/* CLICK */
document.addEventListener("click", e => {
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

/* DRAG WINDOWS */
let dragWin = null;
let offX = 0;
let offY = 0;

document.addEventListener("mousedown", e => {
  if (e.target.classList.contains("titlebar")) {
    dragWin = e.target.parentElement;
    offX = e.offsetX;
    offY = e.offsetY;
  }
});

document.addEventListener("mousemove", e => {
  if (dragWin) {
    dragWin.style.left = (e.pageX - offX) + "px";
    dragWin.style.top = (e.pageY - offY) + "px";
  }
});

document.addEventListener("mouseup", () => dragWin = null);

/* DRAG ICONS (GRID SNAP) */
let dragIcon = null;
let ix = 0;
let iy = 0;

document.querySelectorAll(".icon").forEach(icon => {
  icon.addEventListener("mousedown", e => {
    dragIcon = icon;
    ix = e.offsetX;
    iy = e.offsetY;
  });
});

document.addEventListener("mousemove", e => {
  if (dragIcon) {
    dragIcon.style.position = "absolute";
    dragIcon.style.left = Math.round((e.pageX - ix) / 80) * 80 + "px";
    dragIcon.style.top = Math.round((e.pageY - iy) / 80) * 80 + "px";
  }
});

document.addEventListener("mouseup", () => dragIcon = null);

/* SEARCH */
function searchFiles() {
  const q = document.getElementById("search").value.toLowerCase();
  const box = document.getElementById("searchResults");
  const win = document.getElementById("searchWindow");

  let res = [];

  document.querySelectorAll(".icon").forEach(i => {
    if (i.textContent.toLowerCase().includes(q)) {
      res.push(i.textContent);
    }
  });

  if (!q) return win.classList.add("hidden");

  win.classList.remove("hidden");

  box.innerHTML = res.length
    ? res.map(r => `<p>${r}</p>`).join("")
    : "<p>No results found</p>";
}

/* SNAKE */
let snake, dir, food, ctx, loop, running=false;

function startSnake() {
  if (running) return;
  running = true;

  const c = document.getElementById("game");
  ctx = c.getContext("2d");

  snake = [{x:5,y:5}];
  dir = {x:1,y:0};
  food = {x:10,y:10};

  document.addEventListener("keydown", move);

  clearInterval(loop);
  loop = setInterval(game, 150);
}

function game() {
  let h = {x:snake[0].x+dir.x, y:snake[0].y+dir.y};

  if (h.x<0||h.y<0||h.x>19||h.y>19){
    running=false;
    clearInterval(loop);
    alert("TRY AGAIN");
    return;
  }

  snake.unshift(h);

  if (h.x===food.x && h.y===food.y){
    food={x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*20)};
  } else snake.pop();

  ctx.fillStyle="black";
  ctx.fillRect(0,0,300,300);

  ctx.fillStyle="green";
  snake.forEach(s=>ctx.fillRect(s.x*15,s.y*15,14,14));

  ctx.fillStyle="red";
  ctx.fillRect(food.x*15,food.y*15,14,14);
}

function move(e){
  if (e.key==="ArrowUp") dir={x:0,y:-1};
  if (e.key==="ArrowDown") dir={x:0,y:1};
  if (e.key==="ArrowLeft") dir={x:-1,y:0};
  if (e.key==="ArrowRight") dir={x:1,y:0};
}
