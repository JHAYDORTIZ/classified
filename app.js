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

/* CLOCK */
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("clock").innerText = `${h}:${m}`;
}

setInterval(updateClock, 1000);
updateClock();
