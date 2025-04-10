export class User{
    //members
    email;
    password;
    gender;
    phone;
    name;
    //constructor
    constructor(eml, pwd, gndr, ph,nm){
        this.email = eml;
        this.password = pwd;
        this.gender = gndr;
        this.phone =ph;
        this.name = nm;
    }
    //methods
    getUserEmail(){
      return this.email;
    }
}