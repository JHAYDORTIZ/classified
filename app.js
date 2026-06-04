
let isAdmin = false;
let currentUser = null;

/* SOUNDS */
const boot = new Audio("sounds/boot.mp3");
const click = new Audio("sounds/click.mp3");
const error = new Audio("sounds/error.mp3");

/* LOGIN */
document.getElementById("loginBtn").addEventListener("click", login);

document.getElementById("password").addEventListener("keydown", e=>{
  if(e.key==="Enter") login();
});

function login() {
  const v = document.getElementById("password").value.trim();

  if(v==="pizza17" || v==="4tanyatapes") {

    isAdmin = (v==="pizza17");
    currentUser = v;

    document.getElementById("login").style.display="none";
    document.getElementById("desktop").classList.remove("hidden");

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
  document.getElementById(id).classList.remove("hidden");
}

function closeWindow(id){
  click.play().catch(()=>{});
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

/* SEARCH (ABRE WINDOWS) */
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

/* REPRODUCTOR */
let tracks=[
  "media/audio/track1.mp3",
  "media/audio/track2.mp3"
];

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
