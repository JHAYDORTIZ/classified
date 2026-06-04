let current=null;

function login(){
  const v=document.getElementById("password").value;

  if(v==="pizza17" || v==="4tanyatapes"){
    document.getElementById("login").style.display="none";
    document.getElementById("desktop").classList.remove("hidden");
  } else {
    document.getElementById("error").innerText="error";
  }
}

/* WINDOWS */
function openWin(id){
  document.getElementById(id).classList.remove("hidden");
}

function closeWin(id){
  document.getElementById(id).classList.add("hidden");
}

/* DRAG SIMPLE Y ESTABLE */
let dragTarget=null,offsetX=0,offsetY=0;

function drag(el){
  dragTarget=el.parentElement;

  document.onmousemove=(e)=>{
    if(dragTarget){
      dragTarget.style.left=e.pageX-offsetX+"px";
      dragTarget.style.top=e.pageY-offsetY+"px";
    }
  }
}

document.onmouseup=()=>dragTarget=null;

/* CLOCK */
setInterval(()=>{
  const d=new Date();
  const c=document.getElementById("clock");
  if(c) c.innerText=d.toLocaleTimeString();
},1000);

/* PLAYER SIMPLE */
let tracks=["media/audio/track1.mp3"];
let audio=new Audio();
let i=0;

function play(){
  audio.src=tracks[i];
  audio.play();
}

function pause(){
  audio.pause();
}

function next(){
  i=(i+1)%tracks.length;
  play();
}

function seek(v){
  audio.currentTime=v;
}

/* SEARCH SIMPLE */
function search(){
  const q=document.getElementById("search").value.toLowerCase();

  document.querySelectorAll("#icons div").forEach(el=>{
    el.style.display = el.innerText.toLowerCase().includes(q) ? "block" : "none";
  });
}
