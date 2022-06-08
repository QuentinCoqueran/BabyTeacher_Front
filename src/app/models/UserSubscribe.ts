export class UserSubscribe {
  login: string;
  password: string;
  lastname: string;
  name: string;
  role: string;
  age: number;
  sexe: number;
  //photo: string;
  email: string;
  //description: string ;

  constructor(login: string, password: string, lastname: string, name: string, role: string, age: number, sexe: number, /*photo: string,*/ email: string, /*description: string*/) {
    this.login = login;
    this.password = password;
    this.lastname = lastname;
    this.name = name;
    this.role = role;
    this.age = age;
    this.sexe = sexe;
    //this.photo = photo;
    this.email = email;
    //this.description = description;
  }
}
