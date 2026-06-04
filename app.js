const PASSWORD = "4tanyatapes";

const loginBox = document.getElementById("login");
const desktop = document.getElementById("desktop");
const error = document.getElementById("error");

document
  .getElementById("enterBtn")
  .addEventListener("click", login);

function login() {

  const value =
    document.getElementById("password").value;

  if(value === PASSWORD){

    loginBox.style.display = "none";
    desktop.style.display = "block";

  }else{

    error.textContent = "ACCESS DENIED";

  }
}

function openWindow(id){
  document
    .getElementById(id)
    .classList.remove("hidden");
}

function closeWindow(id){
  document
    .getElementById(id)
    .classList.add("hidden");
}
