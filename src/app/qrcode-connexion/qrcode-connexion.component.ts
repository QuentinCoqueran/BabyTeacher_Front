import {Component, OnInit} from '@angular/core';
import {ConnexionService} from "../services/connexion.service";
import {Params, Router} from "@angular/router";
import {UserConnect} from "../models/UserConnect";

@Component({
  selector: 'app-qrcode-connexion',
  templateUrl: './qrcode-connexion.component.html',
  styleUrls: ['./qrcode-connexion.component.scss']
})
export class QrcodeConnexionComponent implements OnInit {

  constructor(private connexionService: ConnexionService, private router: Router) {
  }

  ngOnInit(): void {
  }


  public returnError: boolean = false;
  public clickConnect: boolean = false;

  checkConnected(pseudo: string, password: string): void {
    this.clickConnect = true;
    if (pseudo.trim() != "" && password.trim() != "") {
      let userConnect: UserConnect = new UserConnect(pseudo, password);
      this.connexionService.connectUser(userConnect).subscribe(
        async res => {
          if (res.response) {
            if (res.response["token"] != undefined) {
              this.returnError = false;
              localStorage.setItem('token', res.response["token"]);
              if (res.response["role"] === "babysitter") {
                if (res.response["firstConnection"]) {
                  await this.router.navigate(['/first-connection-babysitter']);
                  return;
                }
              }
              const queryParams: Params = {login: res.response["login"]};
              await this.router.navigate(
                ['/profile'],
                {
                  queryParams: queryParams,
                });
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
