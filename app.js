const PASSWORD = "4tanyatapes";

/* LOGIN */
function login() {
  const value = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (value === PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("desktop").style.display = "block";
  } else {
    error.textContent = "ACCESS DENIED";
  }
}

/* WINDOWS */
function openWindow(id) {
  const win = document.getElementById(id);
  win.style.display = "block";
  win.style.zIndex = 999;
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}
