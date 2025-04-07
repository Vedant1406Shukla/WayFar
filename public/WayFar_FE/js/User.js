export class User{
    //members
    id;
    email;
    password;
    gender;
    phone
    //constructor
    constructor(id, eml, pwd, gndr, ph){
        this.id = id;
        this.email = eml;
        this.password = pwd;
        this.gender = gndr;
        this.phone =ph;
    }
    //methods
    getUserEmail(){
      return this.email;
    }
}