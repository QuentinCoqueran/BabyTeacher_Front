import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SubscribeService} from "../services/subscribe-service";
import {UserSubscribe} from "../models/UserSubscribe";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe-user.component.html',
  styleUrls: ['./subscribe-user.component.scss']
})

export class SubscribeUserComponent implements OnInit {
  userSubscribe: UserSubscribe = new UserSubscribe();
  public returnError = false;
  public role = "parent";
  public sexe = "1";
  public errorMessage: string | undefined = "";
  public nextSubscribeBool: boolean = false;


  constructor(private subscribeService: SubscribeService, private router: Router) {
  }

  ngOnInit(): void {
    this.modifyRole(this.role)
  }

  sendUserSubscribe(pseudo: string, password: string, lastname: string, name: string, age: string | null, sexe: string | null, email: string): void {
    if(sexe != "1" && sexe != "2"){
      this.errorMessage = "Erreur avec le sexe"
      this.returnError = true;
      return;
    }
    if ((pseudo.trim() != "" && password.trim() != "" && lastname.trim() != "" && name.trim() != "" &&
      email.trim() != "" && this.role === "parent") || (pseudo.trim() != "" && password.trim() != "" && lastname.trim() != "" && name.trim() != "" &&
      email.trim() != "" && age != null && sexe != null && this.role === "babysitter")) {

      if (this.role === "babysitter" && age && parseInt(age) < 16) {
        this.errorMessage = "Age minimum 16 ans"
        this.returnError = true;
        return;
      }
      /*&& description.trim() != ""*/ /*photo.trim() != "" && */ /*photo: string, */ /*, description: string*/
      this.userSubscribe.login = pseudo;
      this.userSubscribe.password = password;
      this.userSubscribe.lastname = lastname;
      this.userSubscribe.name = name;
      this.userSubscribe.role = this.role;
      this.userSubscribe.age = Number(age);
      this.userSubscribe.sexe = Number(sexe);
      //this.userSubscribe.photo = photo;
      this.userSubscribe.email = email;
      //this.userSubscribe.description = description;
      this.subscribeService.subscribeUser(this.userSubscribe).subscribe(
        res => {
          if (res.response) {
            if (res.response["response"]) {
              this.errorMessage = res.response["type"];
              this.returnError = true;
            } else {
              this.returnError = false;
              this.router.navigate(['/login']);
            }
          }
        },
        error => {
          this.returnError = true;
        });
    } else {
      this.errorMessage = "Tous les champs ne sont pas remplis"
      this.returnError = true;
    }
  }

  closeAlert() {
    this.returnError = false;
  }

  modifyRole(roleInput: string) {
    this.role = roleInput;
  }

  nextSubscribe() {
    this.nextSubscribeBool = !this.nextSubscribeBool;
  }

  modifySexe(value: string) {
    this.sexe = value;
  }
}
