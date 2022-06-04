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
      this.userConnect.username = pseudo;
      this.userConnect.password = password;
      this.connexionService.connectUser(this.userConnect).subscribe(
        res => {

          if (res.token != undefined ) {
            this.returnError = false;
            localStorage.setItem('token', res.token);
          } else {
            this.returnError = true;
          }
        },
        error => {
          this.returnError = true;
        });
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
