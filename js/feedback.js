
let funsTextarea = document.querySelector(".funs-area");
let funsBtn = document.querySelector(".funs-btn");
let funsContainer = document.querySelector("#container");

let msg = "";
let post = [];

document.addEventListener("DOMContentLoaded", function() {
  updateOnlineStatus();
});

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

function updateOnlineStatus() {
  if (navigator.onLine && localStorage.getItem("post")!== null) {
    console.log(localStorage.getItem("post"));
    getFromLocalStorage();
    clearLocalStorage();
    successAlert("Відгук був успішно публікований");
  }
}

funsTextarea.addEventListener("keyup", function(e) {
  localStorage.setItem("inputText", funsTextarea.value);
});

funsBtn.addEventListener("click", function(e) {
  if (validation(e)) {
    if ((isOnline())) {
      pushOnServer();
      successAlert("Відгук був успішно публікований");
    } else {
      setInLocalStorage();
      noInternetAlert("Відсутній інтернет. Новина буде публікована після підключення інтернету");
    }
  }
  else{
    noValidAlert("Введіть коментар");
  }
});

function validation(e) {
  e.preventDefault();
  funsTextarea.value = funsTextarea.value.trim();
  if (funsTextarea.value != "") 
    return true;
}

function setInLocalStorage() {
  post.push(funsTextarea.value);
  localStorage.setItem("post", JSON.stringify(post));
  funsTextarea.value = "";
  localStorage.setItem("inputText", "");
}

function createBlock(content) {
  var blockquote = document.createElement("blockquote");
  var hr = document.createElement("hr");

  blockquote.innerHTML = `${content}<p class="subtext"><span>${date(
    new Date()
  )}</span>
  <cite>FootbalFan2010</cite></p>`;
  funsContainer.appendChild(hr);
  funsContainer.appendChild(blockquote);
}

function getFromLocalStorage() {
  funsTextarea.value = localStorage.getItem("inputText");
  if (localStorage.getItem("post")) {
    post = JSON.parse(localStorage.getItem("post"));
    post.forEach(element => createBlock(element));
  }
}
function pushOnServer() {
  createBlock(funsTextarea.value);
  funsTextarea.value = "";
  localStorage.setItem("inputText", "");
}
function clearLocalStorage() {
  localStorage.removeItem('post');
  post = [];
}


function date(now) {
  return now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear();
}

function isOnline() {
  return window.navigator.onLine;
}
