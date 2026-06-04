const PASSWORD = "4tanyatapes";

/* LOGIN */
function login() {
  const value = document.getElementById("password").value;

  if (value === PASSWORD) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("desktop").classList.remove("hidden");
  } else {
    document.getElementById("error").textContent = "ACCESS DENIED";
  }
}

/* WINDOWS */
function openWindow(id) {
  document.getElementById(id).style.display = "block";
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}
