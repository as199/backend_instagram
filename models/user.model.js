const {v4: uuidv4} = require("uuid");
const User = function (user){
    this.id = uuidv4();
    this.firstName = user.firstName;
    this.lastName = user.lastName ;
    this.email = user.email;
    this.password = user.password;
    this.login = user.login ;
    this.phone = user.phone;
    this.adresse = user.adresse ;
    this.avatar = user.avatar ??null;
    this.sexe = user.sexe ;
}
module.exports = User;