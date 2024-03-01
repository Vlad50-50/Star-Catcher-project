search()
function search() {
      if(localStorage.getItem("user_data") == null || localStorage.getItem("account_data")){
        return;
      }else{
        window.location.href = "iindex.html";
      }
};

var form = document.getElementById('form');
document.addEventListener('DOMContentLoaded', function () {
  // вход в ак
  inner();
  // регистрация 
  document.addEventListener('click', function(event) {
    if (event.target.id === 'redirectToReg') {
      inner2();
    }
  });
});
function redirectToLog(){
  inner();
}
function inner(){
  form.innerHTML = `
    <div class="reg sub card text-bg-warning mb-3" style="max-width: 18rem;">
        <div class="card-header">Attention</div>
        <div class="card-body">
            <h5 class="card-title">You are not authorized!</h5>
            <p id="redirectToReg" class="card-text">To sign in, please fill out the fields below. If you don't have an account, 
                <strong style="cursor: pointer;">click here</strong>.
            </p>
        </div>
        <input id="address" type="email" placeholder="E-mail address">
        <input id="password" type="password" placeholder="Password">
        <div id="error"></div>
        <input type="button" name="button" id="but" value="Enter" style="cursor: pointer;" onclick="login()">
    </div>
`;
}

function inner2(){
  form.innerHTML =`
    <div class=".reg sub card text-bg-primary mb-3" style="max-width: 18rem;">
    <div class="card-header">Registration</div>
    <div class="card-body"><h5 class="card-title">Fill out the fields</h5><p class="card-text" onclick="redirectToLog()">You have account?<strong style="cursor: pointer;"> Click here.</strong></p></div>
    <input id="userName" class="input" type="text" pattern="[A-Za-z]*" placeholder="Your name">
    <input id="address" type="email" placeholder="E-mail address">
    <input id="password" type="password" placeholder="New password">
    <input id="passwordRep" type="password" placeholder="Repeat password">
    <div id="error"></div>
    <input type="button" name="button" id="but" value="Enter" style="cursor: pointer;" onclick="register()">
    </div>
    `
}

function login(){
  let address = document.getElementById('address').value;
  let password = document.getElementById('password').value;
  let errorBOX = document.getElementById('error');
  
  if (!address.endsWith('@gmail.com')) {
    errorBOX.innerHTML = `You type no valid e-mail or password `
  }else{
    localStorage.setItem("user_data", JSON.stringify({
      "address":address,
      "pasword":password
    }))
    console.log("гуд")
    window.location.href = "../atems/index.html";
  } 
}

function register(){
  let userName = document.getElementById('userName').value;
  let address  = document.getElementById('address').value;
  let password = document.getElementById('password').value;
  let pasRep   = document.getElementById('passwordRep').value;
  let errorBox = document.getElementById('error');

  if (password == pasRep && userName == null && address == "" && password === "" && pasRep === "") {
      console.log("гуд");
  } else {  
      errorBox.innerHTML = "You type no valid e-mail or password";
  }

  localStorage.setItem("account_data", JSON.stringify({
      "username":userName
  }))
}