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
  document.getElementById(id).classList.remove("hidden");
}

function closeWindow(id) {
  document.getElementById(id).classList.add("hidden");
}
