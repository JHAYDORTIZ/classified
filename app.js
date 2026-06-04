const PASSWORD = "4tanyatapes";

/* LOGIN */
function checkPassword() {
  const input = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (input === PASSWORD) {
    document.getElementById("loginWindow").classList.add("hidden");
    document.getElementById("desktop").classList.remove("hidden");
  } else {
    error.textContent = "ACCESS DENIED";
  }
}

/* TXT FILE */
function openTxt() {
  document.getElementById("txtWindow").classList.remove("hidden");
}

function closeTxt() {
  document.getElementById("txtWindow").classList.add("hidden");
}