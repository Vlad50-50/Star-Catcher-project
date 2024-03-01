function createPostPage(){
    document.title = "Creating Post";

    const content = document.getElementById('data');
    content.innerHTML = `
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
        let token = '1d40006d';
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:3000/posts");
        xhr.responseType = "json";
        xhr.setRequestHeader("apikey", token);
        let joke = JSON.stringify({
            "content": content,
            "username":parseAccount.username
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

