if(localStorage.getItem("user_data") == null && localStorage.getItem("account_data") == null){
    window.location.href = "../login/login.html";
}

const canvas = document.getElementById('data');

function glPhoto(){
    let profile = document.getElementById('user');
    let toUpdate = JSON.parse(localStorage.getItem('account_data'));
    profile.innerHTML=`<img src="${toUpdate.photo}" style="height: 40px; width: 40px; border-radius: 100%;" alt="">`;
}
glPhoto() 

function render() {
    document.title = "Posts";
    canvas.innerHTML='';   
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:3000/posts");
    xhr.responseType = "json";
    xhr.send();

    xhr.onload = () => {
        let contentElement = document.getElementById("data");

        for (const content of xhr.response.reverse()) {
            contentElement.insertAdjacentHTML('beforeend', `
                <div class="post">
                    <div class="photo-name">
                        <img class="photo_user" src="${content.photo}" alt="">
                        <div class="user-name">${content.username}</div>
                    </div>
                    <div class="user-content">${content.content}</div>
                    <p class="coment" onclick="alert('Не кликай на меня больше мне больно')">Coments</p>
                </div>
            `);
        }
    }


}

render();

function createPostPage(){
    document.title = "Creating Post";

    canvas.innerHTML = `
    <div class="input-container">
    <input id="createTextArea" class="inptyles" type="text" placeholder="Insert the body of the post">
    <input id="createBTN" class="inptyles" type="button" value="Post" onclick="createPost()">
    </div>
    `;
}

function createPost(){
    let account = localStorage.getItem("account_data");
    let parseAccount = JSON.parse(account);
    let createBTN = document.getElementById("createBTN");
    // if(parseAccount == null){
        createBTN.addEventListener("click", (event) => {
            event.preventDefault();
            let content = document.getElementById('createTextArea').value;
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "http://127.0.0.1:3000/posts");
            xhr.responseType = "json";
            let joke = JSON.stringify({
                "content": content,
                "username":parseAccount.username,
                "photo":parseAccount.photo
            })
            xhr.send(joke);
            xhr.onload = () => {
                if (xhr.status == 201) {
                    console.log(xhr.response);
                    render();
                    event.target.reset();
                }
                if (xhr.status == 403) { 
                   console.error(xhr.response.error);
                }
            }
            console.log(content);
        })
    // }else{
    //     console.log("zarega");
    // }
}

function redirectToAccount(){
    let acount = JSON.parse(localStorage.getItem("account_data"));
    document.title = "☻ Your Account ☻";
    canvas.innerHTML = `
    <div class="viewBox">
        <div class="photo">
            <img src="${acount.photo}" alt="" class="img">
            <input style="width: 170px;" class="inptyles" type="text" id="URL-image" placeholder="URL to change photo.">
            <input onclick="URLtoProfile ()" class="inptyles" style="width: 50px; cursor: pointer;" value ="Enter">
        </div>
        <div style="margin-bottom: 10px; font-size: medium; color: bisque;">${acount.username}</div>
        <div class="photo">
            <input class="inptyles" style="margin-left: 35px; width: 170px;" type="text" id="textToName" placeholder="Text to change name.">
            <input onclick="TexttoProfile()" class="inptyles" style="width: 50px; cursor: pointer;" value ="Enter">
        </div>
    
    </div>
    `
}

function URLtoProfile (){
    let inpPhoto = document.getElementById('URL-image').value;
    let currentDATA = JSON.parse(localStorage.getItem("account_data"));
    currentDATA.photo = inpPhoto;
    localStorage.setItem("account_data" , JSON.stringify(currentDATA));
    glPhoto()
    redirectToAccount()
}
function TexttoProfile(){
    let newName = document.getElementById('textToName').value;
    let currentDATA = JSON.parse(localStorage.getItem("account_data"));
    currentDATA.username = newName;
    localStorage.setItem("account_data" , JSON.stringify(currentDATA));
    redirectToAccount()
}
function PM(){
    let allElements = document.querySelectorAll('*');
    let allElementsArray = Array.from(allElements);
    allElementsArray.forEach(element => {
        element.classList.add("pink");
    });
    window.open('https://www.example.com', '_blank');
}

function redirectToliFriends(){
    document.title= "Your Friends";
    canvas.innerHTML = `
        <div class="imsorry" style="font-size: 45px;"><p>(ノへ￣、)</p><p class="imsorryText">This side in the development</p></div>
    `;
}

//Забитая функция
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