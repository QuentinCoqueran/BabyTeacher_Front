import {Component, OnInit} from '@angular/core';
import {UserConnect} from "../models/UserConnect";
import {ConnexionService} from "../services/connexion.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion-user',
  templateUrl: './connexion-user.component.html',
  styleUrls: ['./connexion-user.component.css']
})
export class ConnexionUserComponent implements OnInit {
  userConnect: UserConnect = new UserConnect();
  public returnError = false;

  constructor(private connexionService: ConnexionService, private router: Router) {
  }

  ngOnInit(): void {
  }

  checkConnected(pseudo: string, password: string): void {
    if (pseudo.trim() != "" && password.trim() != "") {
      this.userConnect.login = pseudo;
      this.userConnect.password = password;
      this.connexionService.connectUser(this.userConnect).subscribe(
        res => {
          console.log(res)
          if (res.response) {
            if (res.response["token"] != undefined) {
              this.returnError = false;
              localStorage.setItem('token', res.response["token"]);

              if (res.response["role"] === "parent") {
                console.log(res.response["role"])
              }

              if (res.response["role"] === "babysitter") {
                if (res.response["firstConnection"]) {
                  this.router.navigate(['/first-connection-babysitter']);
                }
              }

            } else {
              this.returnError = true;
            }
          } else {
            this.returnError = true;
          }
        },
        error => {
          this.returnError = true;
        });
    } else {
      this.returnError = true;
    }
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem("token") != null;
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  closeAlert() {
    this.returnError = false;
  }
}
