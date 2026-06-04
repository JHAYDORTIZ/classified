
let isAdmin = false;
let currentUser = null;

/* AUDIO */
const bootSound = new Audio("sounds/boot.mp3");
const clickSound = new Audio("sounds/click.mp3");
const errorSound = new Audio("sounds/error.mp3");

/* LOGIN */
document.getElementById("loginBtn").addEventListener("click", login);

document.getElementById("password").addEventListener("keydown", (e)=>{
  if(e.key === "Enter") login();
});

function login() {
  const v = document.getElementById("password").value.trim();

  if(v==="pizza17" || v==="4tanyatapes") {
    isAdmin = (v==="pizza17");
    currentUser = v;

    document.getElementById("login").style.display="none";
    document.getElementById("desktop").classList.remove("hidden");

    bootSound.play().catch(()=>{});
  } else {
    errorSound.play();
    document.getElementById("error").textContent="ACCESS DENIED";
  }
}

/* CLOCK */
setInterval(()=>{
  const d=new Date();
  document.getElementById("clock").textContent=
    d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
},1000);

/* WINDOWS */
function openWindow(id){
  document.getElementById(id).classList.remove("hidden");
}
function closeWindow(id){
  document.getElementById(id).classList.add("hidden");
}

/* 🔥 DRAG FIX REAL */
let drag=null,ox=0,oy=0;

document.addEventListener("mousedown",(e)=>{
  if(e.target.classList.contains("titlebar")){
    drag=e.target.parentElement;
    ox=e.offsetX;
    oy=e.offsetY;
  }
});

document.addEventListener("mousemove",(e)=>{
  if(drag){
    drag.style.left=(e.pageX-ox)+"px";
    drag.style.top=(e.pageY-oy)+"px";
  }
});

document.addEventListener("mouseup",()=>drag=null);

/* ICONS */
const icons=document.querySelectorAll(".icon");
icons.forEach((i,idx)=>{
  const col=idx%2;
  const row=Math.floor(idx/2);
  i.style.left=(20+col*180)+"px";
  i.style.top=(40+row*170)+"px";
});

/* SEARCH (ABRE DE VERDAD) */
function searchFiles(){
  const q=document.getElementById("search").value.toLowerCase();
  const w=document.getElementById("searchWindow");
  const box=document.getElementById("searchResults");

  if(!q){w.classList.add("hidden");return;}

  w.classList.remove("hidden");

  let res=[];

  document.querySelectorAll(".icon span").forEach(i=>{
    if(i.textContent.toLowerCase().includes(q)){
      res.push(i.textContent);
    }
  });

  box.innerHTML=res.length
    ? res.map(r=>`<p onclick="openFromSearch('${r}')">${r}</p>`).join("")
    : "No results found";
}

/* 🔥 ABRIR DESDE BUSCADOR */
function openFromSearch(name){
  const map={
    "imágenes":"images",
    "videos":"video",
    "texto":"notes",
    "unknown":"unknown",
    "snake":"snake",
    "papelera":"recycle",
    "reproductor":"player"
  };

  if(map[name]) openWindow(map[name]);
}

/* 🔥 REPRODUCTOR REAL */
let tracks=["track1.mp3","track2.mp3"];
let current=0;
let audio=new Audio();

function openPlayer(){
  document.getElementById("player").classList.remove("hidden");
  renderPlaylist();
}

function renderPlaylist(){
  document.getElementById("playlist").innerHTML=
    tracks.map((t,i)=>
      `<li onclick="selectTrack(${i})">${t}</li>`
    ).join("");
}

function selectTrack(i){
  current=i;
  play();
}

function play(){
  audio.src=tracks[current];
  audio.play();
}

function pause(){
  audio.pause();
}

function next(){
  current=(current+1)%tracks.length;
  play();
}

function seek(sec){
  audio.currentTime+=sec;
}

function setTime(v){
  audio.currentTime=(v/100)*audio.duration;
}
