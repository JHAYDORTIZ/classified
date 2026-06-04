const PASSWORD = "4tanyatapes";

/* LOGIN */
function login() {
  const value = document.getElementById("password").value;

  if (value === PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("desktop").classList.remove("hidden");
  } else {
    document.getElementById("error").innerText = "ACCESS DENIED";
  }
}

/* WINDOWS */
function openWindow(id) {
  document.getElementById(id).style.display = "block";
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}

/* DRAG ICONS (WINDOWS STYLE BASIC) */
let drag = null;

document.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("icon")) {
    drag = e.target;
  }
});

document.addEventListener("mousemove", (e) => {
  if (drag) {
    drag.style.left = e.pageX + "px";
    drag.style.top = e.pageY + "px";
  }
});

document.addEventListener("mouseup", () => {
  drag = null;
});
