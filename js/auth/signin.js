const mailInput = document.getElementById("EmailInput");
const pwdInput = document.getElementById("passwordInput");
const btnConnexionInput = document.getElementById("btn-connexion");

btnConnexionInput.addEventListener("click", checkCredentials);

function checkCredentials()
{
    //ici il faudra appeler l'API pour véfifier les crédentials en BDD
    if (mailInput.value == "test@gmail.com" && pwdInput.value == "Aze") {
        //alert("vous êtes connecté");
    // va falloir récupérer ce token 
        const token = "eigegijegjeogijorgjge";
        setToken(token);
        setCookie(roleCookieName, "client", 7);
        window.location.replace("/");
    } else {
        mailInput.classList.add("is-invalid");
        pwdInput.classList.add("is-invalid");
    }
}