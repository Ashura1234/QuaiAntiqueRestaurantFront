export default class Route {
    constructor(url, title, pathHtml, autoRize, pathJS = "") {
      this.url = url;
      this.title = title;
      this.pathHtml = pathHtml;
      this.pathJS = pathJS;
      this.autoRize = autoRize;
    }
}

/*
[] -> tout le monde peut y accéder
["disconnected"] -> réserver aux utilisateur déconnected
["client"] -> réserver aux utilisateurs avec le rôle client 
["admin"] -> réserver aux utilisateurs avec le rôle admin 
["client", "admin"] -> réserver aux utilisateurx avec le rôle client ou le rôle admin 

*/