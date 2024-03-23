//implémenter le js de la page, vérifier le champ réquis

const inputNom = document.getElementById("NomInput");

inputNom.addEventListener("keyup",validateForm);

function validateForm()
{
    validateRequired(inputNom);   
}

function validateRequired(input)
{
    if(input.value != ''){
        //ça passe, c'est ok
        input.classList.add("is-valid");
        input.classList.remove("is-invalid")
    }
    else{
        //ça passe pas, c'est pas ok
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }
}