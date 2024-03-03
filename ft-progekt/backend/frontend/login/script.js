search()
function search() {
  if(localStorage.getItem("user_data") == null && localStorage.getItem("account_data") == null){
    return;
  }else{
    window.location.href = "../atems/index.html";
  }
};

function login(){
  let inpName = document.getElementById('inpN').value;
  let inpPhoto = document.getElementById('inpP').value;
  let inpEmail = document.getElementById('inpE').value;
  let pass1 = document.getElementById('inpPas1').value;
  let pass2 = document.getElementById('inpPas2').value;
  let error = document.getElementById('error');
  var allFieldsFilled = inpEmail !== '' && inpName !== '' && inpPhoto !== '' && pass1 !== '' && pass2 !== '';
  console.log(allFieldsFilled);
  if(allFieldsFilled == false){
    error.innerHTML = `You have entered incorrect data.`
  }else {
    if (!inpEmail.endsWith('@gmail.com')){
      error.innerHTML = `You have entered incorrect data.`
    }else {
      if(pass1 == pass2){
        console.log("logining");
        localStorage.setItem("account_data",JSON.stringify({
          "photo":inpPhoto,
          "username":inpName
        }))
        localStorage.setItem("user_data", JSON.stringify({
          "address":inpEmail,
          "pasword":pass1
        }))
        search()
      }else {
        error.innerHTML = `You have entered incorrect data.`
      }
    }
  }
}