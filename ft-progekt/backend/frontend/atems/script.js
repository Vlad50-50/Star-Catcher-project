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
                        <div class ="likeDislike">
                            <button class="btn btn-primary likedislike" id="like_${content.id}">
                                <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>   
                                <span class="badge text-bg-danger ms-2">${content.likes}</span>
                            </button>
                                <button class="btn btn-secondary likedislike"id="dislike_${content.id}">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 14V4M8 14L4 14V4.00002L8 4M8 14L13.1956 20.0615C13.6886 20.6367 14.4642 20.884 15.1992 20.7002L15.2467 20.6883C16.5885 20.3529 17.1929 18.7894 16.4258 17.6387L14 14H18.5604C19.8225 14 20.7691 12.8454 20.5216 11.6078L19.3216 5.60779C19.1346 4.67294 18.3138 4.00002 17.3604 4.00002L8 4" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <span class="badge text-bg-danger ms-2">${content.dislikes}</span>
                            </button>
                        </div>
                </div>
            `);
        }
        let buttons = document.getElementsByClassName("likedislike");
        Array.from(buttons).forEach((btn) => {
            btn.addEventListener("click", likeDislike);
        })
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

function likeDislike() {
    let elementId = this.id;
    let obj = elementId.split("_"); 
    let title = obj[0]; 
    let jokeId = obj[1];
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://127.0.0.1:3000/${title}?id=${jokeId}`);
    xhr.send();
    xhr.onload = () => {
        render();
    }
}