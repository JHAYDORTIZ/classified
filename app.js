const ADMIN_PASSWORD = "pizza17";
const USER_PASSWORD = "4tanyatapes";

/* SOUNDS */
const bootSound = new Audio("sounds/boot.mp3");
const clickSound = new Audio("sounds/click.mp3");
const errorSound = new Audio("sounds/error.mp3");

/* LOGIN */
document.getElementById("password").addEventListener("keydown", e => {
  if (e.key === "Enter") login();
});

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

/* CLOCK */
setInterval(() => {
  const d = new Date();
  document.getElementById("clock").textContent =
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}, 1000);

/* CLICK SOUND */
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
  clickSound.currentTime = 0;
  clickSound.play();
  document.getElementById(id).classList.add("hidden");
}

/* DRAG WINDOWS */
let dragWin = null, ox=0, oy=0;

document.addEventListener("mousedown", e => {
  if (e.target.classList.contains("titlebar")) {
    dragWin = e.target.parentElement;
    ox = e.offsetX;
    oy = e.offsetY;
  }
});

document.addEventListener("mousemove", e => {
  if (dragWin) {
    dragWin.style.left = (e.pageX - ox) + "px";
    dragWin.style.top = (e.pageY - oy) + "px";
  }
});

document.addEventListener("mouseup", () => dragWin = null);

/* ICON POSITIONS (SIMULACIÓN XP) */
const icons = document.querySelectorAll(".icon");
icons.forEach((i, idx) => {
  const col = idx % 2;
  const row = Math.floor(idx / 2);

  i.style.left = (20 + col * 140) + "px";
  i.style.top = (40 + row * 140) + "px";
});

/* SEARCH */
function searchFiles() {
  const q = document.getElementById("search").value.toLowerCase();
  const win = document.getElementById("searchWindow");
  const box = document.getElementById("searchResults");

  if (!q) return win.classList.add("hidden");

  win.classList.remove("hidden");

  let res = [];

  document.querySelectorAll(".icon span").forEach(i => {
    if (i.textContent.toLowerCase().includes(q)) {
      res.push(i.textContent);
    }
  });

  box.innerHTML = res.length ? res.map(r=>`<p>${r}</p>`).join("") : "No results found";
}

/* AUDIO PLAYER */
let tracks = ["audio1.mp3","audio2.mp3"];
let current = 0;
let audio = new Audio();
let loop = false;

function openPlayer() {
  document.getElementById("player").classList.remove("hidden");
  renderPlaylist();
}

function renderPlaylist() {
  document.getElementById("playlist").innerHTML =
    tracks.map((t,i)=>`<li onclick="selectTrack(${i})">${t}</li>`).join("");
}

function selectTrack(i){
  current = i;
  audio.src = tracks[i];
  audio.play();
}

function play(){ audio.src = tracks[current]; audio.play(); }
function pause(){ audio.pause(); }
function next(){ current=(current+1)%tracks.length; play(); }
function toggleLoop(){ audio.loop = !audio.loop; }

/* SNAKE */
let snake, dir, food, ctx, loop, running=false;

function startSnake(){
  if(running) return;
  running=true;

  const c=document.getElementById("game");
  ctx=c.getContext("2d");

  snake=[{x:5,y:5}];
  dir={x:1,y:0};
  food={x:10,y:10};

  document.addEventListener("keydown",move);

  loop=setInterval(game,150);
}

function game(){
  let h={x:snake[0].x+dir.x,y:snake[0].y+dir.y};

  if(h.x<0||h.y<0||h.x>19||h.y>19){
    running=false;
    clearInterval(loop);
    alert("TRY AGAIN");
    return;
  }

  snake.unshift(h);

  if(h.x===food.x&&h.y===food.y){
    food={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)};
  } else snake.pop();

  ctx.fillStyle="black";
  ctx.fillRect(0,0,300,300);

  ctx.fillStyle="green";
  snake.forEach(s=>ctx.fillRect(s.x*15,s.y*15,14,14));

  ctx.fillStyle="red";
  ctx.fillRect(food.x*15,food.y*15,14,14);
}

function move(e){
  if(e.key==="ArrowUp")dir={x:0,y:-1};
  if(e.key==="ArrowDown")dir={x:0,y:1};
  if(e.key==="ArrowLeft")dir={x:-1,y:0};
  if(e.key==="ArrowRight")dir={x:1,y:0};
}
