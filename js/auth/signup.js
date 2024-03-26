//implémenter le js de la page, vérifier le champ réquis

const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidPassowrd = document.getElementById("ValidezPasswordInput");
const btnValidation = document.getElementById("btnValidationInscription");
const formulaireIinscription = document.getElementById("formulaireInscription");


inputNom.addEventListener("keyup",validateForm);
inputPrenom.addEventListener("keyup",validateForm);
inputMail.addEventListener("keyup",validateForm);
inputPassword.addEventListener("keyup",validateForm);
inputValidPassowrd.addEventListener("keyup",validateForm);
btnValidation.addEventListener("click", inscrireUtilisateur);

function validateForm()
{
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPrenom);
    const mailOk = checkmail(inputMail);
    const passwordOk = checkPwd(inputPassword);
    const validPwdOk = validedPwd(inputPassword, inputValidPassowrd);
    checkmail(inputMail);
    if (nomOk && prenomOk && mailOk && passwordOk && validPwdOk) {
        btnValidation.disabled = false;
    } else {
        btnValidation.disabled = true;
    }
}

function checkmail(input)
{
    // définir mon expression régulière 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)){
         //ça passe, c'est ok
         input.classList.add("is-valid");
         input.classList.remove("is-invalid");
         return true;
    }else{
        //ça passe pas, c'est pas ok
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
} 

function validedPwd(inputpwd, inputvalidpwd) 
{
    if (inputpwd.value == inputvalidpwd.value) {
        inputvalidpwd.classList.add("is-valid");
        inputvalidpwd.classList.remove("is-invalid");
        return true;  
    } else{
        //ça passe pas, c'est pas ok
        inputvalidpwd.classList.remove("is-valid");
        inputvalidpwd.classList.add("is-invalid");
        return false;
    }
}

function checkPwd(input)
{
    // définir mon expression régulière 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const PwdUser = input.value;
    if (PwdUser.match(passwordRegex)){
         //ça passe, c'est ok
         input.classList.add("is-valid");
         input.classList.remove("is-invalid");
         return true;
    }else{
        //ça passe pas, c'est pas ok
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateRequired(input)
{
    if(input.value != ''){
        //ça passe, c'est ok
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        //ça passe pas, c'est pas ok
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function inscrireUtilisateur() {
    let dataForm = new FormData(formulaireIinscription);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "firstName": dataForm.get("nom"),
      "lastName": dataForm.get("prenom"),
      "email": dataForm.get("email"),
      "password": dataForm.get("mdp")
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://127.0.0.1:8000/api/registration", requestOptions)
      .then((response) => {
        if (response.ok) {
        return response.json();
        } else {
            alert("Erreur Lors de l'inscription");
        }
      })
      .then((result) => 
      {
        alert("Bravo,"+dataForm.get("prenom")+", inscription réussie ! vous pouvez vous connecter !");
        document.location.href="/signin";
        console.log(result)
        })
      .catch((error) => console.error(error));
}