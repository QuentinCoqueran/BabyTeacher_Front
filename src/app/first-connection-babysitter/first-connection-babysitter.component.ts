import {Component, OnInit} from '@angular/core';
import {ConnexionService} from "../services/connexion.service";
import {UserSubscribe} from "../models/UserSubscribe";

@Component({
  selector: 'app-first-connection-babysitter',
  templateUrl: './first-connection-babysitter.component.html',
  styleUrls: ['./first-connection-babysitter.component.css']
})
export class FirstConnectionBabysitterComponent implements OnInit {
  public returnError = false;
  public user: UserSubscribe = new UserSubscribe('','','','','',0,0,'');

  constructor(private authService: ConnexionService) {
  }

  ngOnInit(): void {
    this.initUser();
  }

  closeAlert() {
    this.returnError = false;
  }

  async initUser() {
    let userService = await this.authService.isUserLoggedIn();
    if(userService){
      this.user.role = userService["role"]
    }
    return
  }
}
