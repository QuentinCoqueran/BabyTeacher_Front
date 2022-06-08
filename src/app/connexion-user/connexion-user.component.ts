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

  public returnError: boolean = false;
  public clickConnect: boolean = false;

  constructor(private connexionService: ConnexionService, private router: Router) {
  }

  ngOnInit(): void {
  }

  checkConnected(pseudo: string, password: string): void {
    this.clickConnect = true;
    if (pseudo.trim() != "" && password.trim() != "") {
      let userConnect: UserConnect = new UserConnect(pseudo, password);
      this.connexionService.connectUser(userConnect).subscribe(
        res => {
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
          this.clickConnect = false;
        },
        error => {
          this.returnError = true;
          this.clickConnect = false;
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
