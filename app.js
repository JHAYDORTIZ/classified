
let current = 0;
let audio = new Audio();

/* LOGIN */
function login() {
  const v = document.getElementById("password").value;

  if (v === "pizza17" || v === "4tanyatapes") {
    document.getElementById("login").style.display = "none";
    document.getElementById("desktop").classList.remove("hidden");
  } else {
    document.getElementById("error").innerText = "ACCESS DENIED";
  }
}

/* WINDOWS */
function openWin(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closeWin(id) {
  click();
  document.getElementById(id).classList.add("hidden");
}

/* CLICK SOUND (estable) */
function click() {
  const c = new Audio("sounds/click.mp3");
  c.volume = 0.5;
  c.play();
}

/* DRAG SYSTEM (estable real) */
let dragEl = null;
let offsetX = 0;
let offsetY = 0;

document.addEventListener("mousedown", (e) => {
  const bar = e.target.closest(".bar");
  if (!bar) return;

  dragEl = bar.parentElement;
  const r = dragEl.getBoundingClientRect();

  offsetX = e.clientX - r.left;
  offsetY = e.clientY - r.top;
});

document.addEventListener("mousemove", (e) => {
  if (!dragEl) return;

  dragEl.style.left = (e.clientX - offsetX) + "px";
  dragEl.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
  dragEl = null;
});

/* CLOCK */
setInterval(() => {
  const d = new Date();
  const el = document.getElementById("clock");
  if (el) el.innerText = d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
}, 1000);

/* SEARCH SIMPLE */
function search() {
  const q = document.getElementById("search").value.toLowerCase();

  document.querySelectorAll("#icons div").forEach(el => {
    el.style.display = el.innerText.toLowerCase().includes(q)
      ? "block"
      : "none";
  });
}

/* SNAKE (FUNCIONAL SIMPLE) */
function startSnake() {
  const c = document.getElementById("game");
  const ctx = c.getContext("2d");

  let snake = [{x:150,y:150}];
  let dir = {x:10,y:0};

  function loop() {
    ctx.clearRect(0,0,300,300);

    snake.unshift({
      x: snake[0].x + dir.x,
      y: snake[0].y + dir.y
    });

    snake.pop();

    snake.forEach(p=>{
      ctx.fillStyle="green";
      ctx.fillRect(p.x,p.y,10,10);
    });

    requestAnimationFrame(loop);
  }

  loop();

  document.onkeydown = (e) => {
    if (e.key==="ArrowUp") dir={x:0,y:-10};
    if (e.key==="ArrowDown") dir={x:0,y:10};
    if (e.key==="ArrowLeft") dir={x:-10,y:0};
    if (e.key==="ArrowRight") dir={x:10,y:0};
  };
}

/* PLAYER SIMPLE */
function play() {
  audio.src = "media/audio/track1.mp3";
  audio.play();
}

function pause() {
  audio.pause();
}

function next() {
  play();
}

function seek(v) {
  audio.currentTime = v;
}
