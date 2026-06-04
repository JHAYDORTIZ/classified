const PASSWORD = "4tanyatapes";

document.getElementById("enterBtn").addEventListener("click", login);

function login() {

  const value = document.getElementById("password").value;

  if (value === PASSWORD) {

    document.getElementById("login").style.display = "none";
    document.getElementById("desktop").style.display = "block";

  } else {
    document.getElementById("error").textContent = "ACCESS DENIED";
  }
}

function openWindow(id) {
  const el = document.getElementById(id);
  el.style.display = "block";
  el.style.zIndex = 999;
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}
