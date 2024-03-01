if(localStorage.getItem("user_data") == null){
    window.location.href = "../login/login.html";
}
function render() {
    document.title = "Posts";
    document.getElementById('data').innerHTML='';
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:3000/posts");
    xhr.responseType = "json";
    xhr.send();

    xhr.onload = () => {
        let contentElement = document.getElementById("data");

        for (const content of xhr.response) {
            contentElement.innerHTML += `
            <div class="post">
            <div class="photo-name">
                <img class="photo_user" src="${content.user_photo}" alt="">
                <div class="user-name">${content.username}</div>
            </div>
            <div class="user-content">${content.content}</div>
            <p class="coment">Coments</p>
            </div>
            `
        }
    }
    
}
render();

// function likeDislike() {
//     let elementId = this.id;
//     let obj = elementId.split("_"); // ["like", 3], ["dislike", 3]
//     let title = obj[0]; // like or dislike
//     let jokeId = obj[1]; // some id -> 1, 2, 3, 4, 5
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", `http://127.0.0.1:3000/${title}?id=${jokeId}`);
//     xhr.send();
//     xhr.onload = () => {
//         render();
//     }
// }




