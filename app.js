console.log("APP JS CARGADO");

let isAdmin = false;
let currentUser = null;

let fileSystem = [];

fetch("index-media.json")
  .then(r => r.json())
  .then(data => {
    fileSystem = data.files;
    renderDesktop();
  });

function renderDesktop() {
  renderFolder("images");
  renderFolder("videos");
  renderFolder("notes");
  renderFolder("unknown");
  renderFolder("recycle");
}

function renderFolder(folderName) {
  const windowEl = document.getElementById(folderName);
  const content = windowEl.querySelector(".content");

 const files = fileSystem.filter(f =>
  f.includes(`/${folderName}/`)
);

  content.innerHTML = files.length
    ? files.map(f =>
        `<div onclick="openFile('${f}')" style="cursor:pointer">
          📄 ${f.split("/").pop()}
        </div>`
      ).join("")
    : "No files";
}

/* SOUNDS */
const boot = new Audio("sounds/boot.mp3");
const error = new Audio("sounds/error.mp3");

const clickSound = new Audio("sounds/click.mp3");
clickSound.volume = 0.5;

function playClick(){
  clickSound.currentTime = 0;
  clickSound.play().catch(()=>{});
}

/* LOGIN */
window.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("loginBtn");
  const pass = document.getElementById("password");

  if(btn) btn.addEventListener("click", login);

  if(pass){
    pass.addEventListener("keydown", (e) => {
      if(e.key === "Enter") {
        e.preventDefault();
        login();
      }
    });
  }

});

function login() {
  const v = document.getElementById("password").value.trim();

  if(v==="pizza17" || v==="4tanyatapes") {

    isAdmin = (v==="pizza17");
    currentUser = v;

    document.getElementById("login").style.display="none";
document.getElementById("desktop").classList.remove("hidden");

setTimeout(() => {
  renderDesktop();
}, 50);
    boot.play().catch(()=>{});
  }
  else {
    error.play();
    document.getElementById("error").textContent="ACCESS DENIED";
  }
}

/* CLOCK */
setInterval(()=>{
  const d=new Date();
  document.getElementById("clock").textContent=
    d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
},1000);

/* WINDOWS */
function openWindow(id){
  playClick();
  document.getElementById(id).classList.remove("hidden");
}

function closeWindow(id){
  playClick();
  document.getElementById(id).classList.add("hidden");
}

/* ICON GRID */
const icons=document.querySelectorAll(".icon");

icons.forEach((i,idx)=>{
  const col=idx%2;
  const row=Math.floor(idx/2);

  i.style.left=(20+col*200)+"px";
  i.style.top=(40+row*180)+"px";
});

/* SEARCH */
function searchFiles(){
  const q = document.getElementById("search").value.toLowerCase();
  const w = document.getElementById("searchWindow");
  const box = document.getElementById("searchResults");

  if(!q){
    w.classList.add("hidden");
    return;
  }

  w.classList.remove("hidden");

  const results = fileSystem.filter(f =>
    f.toLowerCase().includes(q)
  );

  box.innerHTML = results.length
    ? results.map(r =>
        `<p onclick="openFile('${r}')">
          ${r.split("/").pop()}
        </p>`
      ).join("")
    : "No results found";
}

function openFromSearch(name){
  const map={
    "imágenes":"images",
    "videos":"video",
    "texto":"notes",
    "unknown":"unknown",
    "snake":"snake",
    "papelera de reciclaje":"recycle",
    "reproductor":"player"
  };

  if(map[name]) openWindow(map[name]);
}

/* REPRODUCTOR (VERSION CON JSON) */

let tracks = [];
let current = 0;
let audio = new Audio();
let snakeDir = {x:1,y:0};

audio.ontimeupdate = () => {
  const bar = document.getElementById("seekBar");
  if (!audio.duration) return;

  bar.value = (audio.currentTime / audio.duration) * 100;
};

fetch("index-media.json")
  .then(r => r.json())
  .then(data => {
    tracks = data.files.filter(f => f.startsWith("media/audio/"));
    renderPlaylist();
  });

function openPlayer(){
  playClick();
  document.getElementById("player").classList.remove("hidden");
  renderPlaylist();
}

function renderPlaylist(){
  document.getElementById("playlist").innerHTML =
    tracks.map((t,i)=>
      `<li onclick="selectTrack(${i})">${t.split("/").pop()}</li>`
    ).join("");
}

function selectTrack(i){
  current = i;
  play();
}

function play(){
  audio.src = tracks[current];
  audio.play();
}

function pause(){
  audio.pause();
}

function next(){
  current = (current + 1) % tracks.length;
  play();
}

function seek(sec){
  audio.currentTime += sec;
}

function setTime(v){
  audio.currentTime = (v / 100) * audio.duration;
}

/* DRAG WINDOWS */
let dragWindow = null;
let offsetX = 0;
let offsetY = 0;

document.addEventListener("pointerdown", (e) => {

  const bar = e.target.closest(".titlebar");
  if (!bar) return;

  dragWindow = bar.parentElement;

  const rect = dragWindow.getBoundingClientRect();

  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  e.preventDefault(); // evita scroll en móvil
});

document.addEventListener("pointermove", (e) => {

  if (!dragWindow) return;

  dragWindow.style.left =
    (e.clientX - offsetX) + "px";

  dragWindow.style.top =
    (e.clientY - offsetY) + "px";
});

document.addEventListener("pointerup", () => {
  dragWindow = null;
});

/* SNAKE */
let snakeInterval;

function startSnake(){

  playClick();

  clearInterval(snakeInterval);

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  let snake = [{x:15,y:15}];
  snakeDir = {x:1,y:0};
  
  let food = {
    x:Math.floor(Math.random()*30),
    y:Math.floor(Math.random()*30)
  };

  let score = 0;

  /* RESET TECLADO */
  document.onkeydown = (e)=>{

   if(e.key==="ArrowUp" && snakeDir.y!==1)
  snakeDir={x:0,y:-1};

if(e.key==="ArrowDown" && snakeDir.y!==-1)
  snakeDir={x:0,y:1};

if(e.key==="ArrowLeft" && snakeDir.x!==1)
  snakeDir={x:-1,y:0};

if(e.key==="ArrowRight" && snakeDir.x!==-1)
  snakeDir={x:1,y:0};

  };

  snakeInterval = setInterval(()=>{

    const head={
  x:snake[0].x+snakeDir.x,
  y:snake[0].y+snakeDir.y
  };

    if(
      head.x<0 ||
      head.y<0 ||
      head.x>=30 ||
      head.y>=30
    ){
      clearInterval(snakeInterval);
      alert("Try Again - Score: "+score);
      return;
    }

    for(let part of snake){
      if(part.x===head.x && part.y===head.y){
        clearInterval(snakeInterval);
        alert("Try Again - Score: "+score);
        return;
      }
    }

    snake.unshift(head);

    if(head.x===food.x && head.y===food.y){

      score++;

      food={
        x:Math.floor(Math.random()*30),
        y:Math.floor(Math.random()*30)
      };

    }else{
      snake.pop();
    }

    ctx.clearRect(0,0,300,300);

    ctx.fillStyle="red";
    ctx.fillRect(food.x*10, food.y*10, 10, 10);

    ctx.fillStyle="lime";

    snake.forEach(part=>{
      ctx.fillRect(part.x*10, part.y*10, 10, 10);
    });

    ctx.fillStyle="white";
    ctx.fillText("Score: "+score,10,20);

  },120);
}
  
function openFile(path){

  const ext = path.split(".").pop().toLowerCase();

  let win = document.createElement("div");
  win.className = "window";

  win.style.position = "absolute";
  win.style.left = "200px";
  win.style.top = "150px";

  let title = "";
  let content = "";

  if(ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "heic"){
    title = "image";
    content = `<img src="${path}" style="max-width:100%; max-height:100%;">`;
  }

  else if(ext === "mp4"){
    title = "video";
    content = `<video src="${path}" controls style="max-width:100%"></video>`;
  }

  else if(ext === "mp3"){
    title = "audio";
    content = `<audio src="${path}" controls autoplay></audio>`;
  }

  else if(ext === "txt"){
    title = "text";
    content = `<pre>Loading...</pre>`;

    fetch(path)
      .then(r => r.text())
      .then(text => {
        win.querySelector(".content").innerHTML =
          `<pre style="white-space:pre-wrap; word-wrap:break-word;">${text}</pre>`;
      })
      .catch(() => {
        win.querySelector(".content").innerHTML =
          `<p>Error loading file</p>`;
      });
  }

  else {
    title = "file";
    content = `<p>${path}</p>`;
  }

  win.innerHTML = `
    <div class="titlebar">
      ${title}
      <div class="close-btn">✖</div>
    </div>
    <div class="content">
      ${content}
    </div>
  `;

  document.getElementById("desktopArea").appendChild(win);

  win.querySelector(".close-btn").onclick = () => win.remove();
}
