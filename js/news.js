window.addEventListener("online", updateOnlineStatus);

function updateOnlineStatus() {
    if (localStorage.getItem("adminTitle")!== null) {
        createBlock();
        clearLocalStorage();
      successAlert("Новина була успішно опублікована");
    }
  }

function createBlock(){
    let titleAr = JSON.parse(localStorage.getItem("adminTitle"));
    let bodyAr = JSON.parse(localStorage.getItem("adminBody"));
    let i = titleAr.length;
    while(i>0){
        i--;
        let figure = document.createElement("figure");
        figure.classList.add('figure-item');
        figure.innerHTML =  `
        <img src="./../img/arsenal-logo-32048.png" alt="">
        <div class="figure-text-block">
            <h2>${titleAr[i]}</h2>
            <p>${bodyAr[i]}</p>
        </div>`;
        document.getElementById("news").appendChild(figure);

    }

}

function clearLocalStorage() {
    localStorage.removeItem('adminTitle');
    localStorage.removeItem('adminBody');
}