export class UserSubscribe {
  login: string;
  password: string;
  lastname: string;
  name: string;
  role: string;
  age: number;
  sexe: number;
  email: string;

  constructor(login: string, password: string, lastname: string, name: string, role: string, age: number, sexe: number,  email: string) {
    this.login = login;
    this.password = password;
    this.lastname = lastname;
    this.name = name;
    this.role = role;
    this.age = age;
    this.sexe = sexe;
    this.email = email;
  }
}
