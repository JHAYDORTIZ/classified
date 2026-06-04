const PASSWORD = "4tanyatapes";

/* LOGIN */
function login() {
  const input = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (input === PASSWORD) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("desktop").classList.remove("hidden");
  } else {
    error.textContent = "ACCESS DENIED";
  }
}

/* WINDOWS */
function openWindow(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closeWindow(id) {
  document.getElementById(id).classList.add("hidden");
}

/* DRAG SYSTEM */
let dragItem = null;
let offsetX = 0;
let offsetY = 0;

document.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("titlebar")) {
    dragItem = e.target.parentElement;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  }
});

document.addEventListener("mousemove", (e) => {
  if (dragItem) {
    dragItem.style.left = (e.pageX - offsetX) + "px";
    dragItem.style.top = (e.pageY - offsetY) + "px";
  }
});

document.addEventListener("mouseup", () => {
  dragItem = null;
});