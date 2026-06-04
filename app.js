const PASSWORD = "4tanyatapes";

/* LOGIN */
function login() {
  const v = document.getElementById("password").value;

  if (v === PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("desktop").classList.remove("hidden");
  } else {
    document.getElementById("error").innerText = "invalid key";
  }
}

/* WINDOWS */
function openWindow(id) {
  document.getElementById(id).style.display = "block";
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}

/* CLOCK */
function clock() {
  const d = new Date();
  document.getElementById("clock").innerText =
    String(d.getHours()).padStart(2,"0") + ":" +
    String(d.getMinutes()).padStart(2,"0");
}
setInterval(clock, 1000);
clock();

/* DRAG WINDOWS */
let dragWin = null;
let offsetX = 0;
let offsetY = 0;

function startDrag(e, el) {
  dragWin = el;
  offsetX = e.offsetX;
  offsetY = e.offsetY;

  document.onmousemove = moveWindow;
  document.onmouseup = stopDrag;
}

function moveWindow(e) {
  if (!dragWin) return;
  dragWin.style.left = (e.pageX - offsetX) + "px";
  dragWin.style.top = (e.pageY - offsetY) + "px";
}

function stopDrag() {
  dragWin = null;
  document.onmousemove = null;
  document.onmouseup = null;
}
