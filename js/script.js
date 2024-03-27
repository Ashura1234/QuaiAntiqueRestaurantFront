const tokenCookieName = "accesstoken";
const signoutBtn = document.getElementById("signout-btn");
const roleCookieName = "role";
const apiUrl = "http://127.0.0.1:8000/api/";
signoutBtn.addEventListener("click", signout);

function getRole()
{
    return getCookie(roleCookieName);
}

function signout()
{
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName);
    window.location.reload();
}

function setToken(token) {
    setCookie(tokenCookieName, token, 7);
}

function getToken()
{
    return getCookie(tokenCookieName);
}

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(const element of ca) {
        let c = element;
        while (c.startsWith(' ')) c = c.substring(1,c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function isConnected()
{
    if(getToken() == null || getToken == undefined ) {
        return false;
    } else {
        return true;
    }
}




function showAndHideElementForRoles()
{
    const userConnected = isConnected();
    const Role = getRole();
    
    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element=>{
        switch(element.dataset.show){
            case 'disconnected':
                if(userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'connected':
                if(!userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'admin':
                if(!userConnected || Role != "admin"){
                    element.classList.add("d-none");
                }
                break;
            case 'client':
                if(!userConnected || Role != "client"){
                    element.classList.add("d-none");
                }
                break;
        }
    })
}


function SanitizeHtml(text) {
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}


function getInfoUser()
{
    const myHeaders = new Headers();
    myHeaders.append("x-AUTH-TOKEN",getToken());
 
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };  

      fetch(apiUrl+"account/me", requestOptions)
        .then(Response => {
            if(Response.ok) {
                return Response.json();
            }else{
                console.log("Impossible de récupérer le informations utilisateur");
            }
        })
        .then(result =>{
            return result;
        })
        .catch(error => {
            console.error("erreur lors de la récupérations des données utilisateurs", error);
        });
}