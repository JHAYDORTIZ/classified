let isAdmin = false;
let currentUser = null;

/* SOUNDS */
const bootSound = new Audio("sounds/boot.mp3");
const clickSound = new Audio("sounds/click.mp3");
const errorSound = new Audio("sounds/error.mp3");

/* ===== LOGIN FUNCIONA SIEMPRE ===== */
function doLogin() {
  const input = document.getElementById("password");
  const v = (input?.value || "").trim();

  if (v === "pizza17") {
    isAdmin = true;
    currentUser = "pizza17";
    startSystem();
  }

  else if (v === "4tanyatapes") {
    isAdmin = false;
    currentUser = "4tanyatapes";
    startSystem();
  }

  else {
    errorSound.play().catch(()=>{});
    document.getElementById("error").textContent = "ACCESS DENIED";
  }
}

function startSystem() {
  document.getElementById("login").style.display = "none";
  document.getElementById("desktop").classList.remove("hidden");
  bootSound.play().catch(()=>{});
}

/* BOTÓN LOGIN */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginBtn").addEventListener("click", doLogin);

  document.getElementById("password").addEventListener("keydown", (e) => {
    if (e.key === "Enter") doLogin();
  });
});

/* CLOCK */
setInterval(() => {
  const d = new Date();
  document.getElementById("clock").textContent =
    d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}, 1000);

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
  clickSound.currentTime = 0;
  clickSound.play();
  document.getElementById(id).classList.add("hidden");
}

/* ICON GRID */
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

  box.innerHTML = res.length
    ? res.map(r => `<p>${r}</p>`).join("")
    : "No results found";
}

/* AUDIO PLAYER SIMPLE */
let tracks = ["audio1.mp3","audio2.mp3"];
let current = 0;
let audio = new Audio();

function openPlayer() {
  document.getElementById("player").classList.remove("hidden");
}

function play() {
  audio.src = tracks[current];
  audio.play();
}

function pause() {
  audio.pause();
}

function next() {
  current = (current + 1) % tracks.length;
  play();
}

function toggleLoop() {
  audio.loop = !audio.loop;
}
