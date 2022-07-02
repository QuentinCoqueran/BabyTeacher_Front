import {Component, OnInit} from '@angular/core';
import {ConnexionService} from "../services/connexion.service";
import {AvailabilityService} from "../services/availability.service";
import {ActivatedRoute} from "@angular/router";

interface Country {
  name: string;
  flag: string;
  area: number | undefined;
  population: number | undefined;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  countries = [{
    _lundi: "",
    _mardi: "",
    _mercredi: "",
    _jeudi: "",
    _vendredi: "",
    _samedi: "",
    _dimanche: ""
  }];
  public idUser: number;
  public loginParam: string = "";
  constructor(private authService: ConnexionService, private availableService: AvailabilityService,private route: ActivatedRoute) {
  }


  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.loginParam = params['login'];
      await this.initUserByLogin();
      await this.getAvailabilityParseByUserId();
    });

  }

  private getAvailabilityParseByUserId() {
    this.availableService.getAvailabilityParseByUserId(this.idUser.toString()).subscribe(
      (data: any) => {
        if (data.response) {
          console.log(data.response);
          this.countries = data.response.listCalendar;
        }
      });
  }

  private async initUserByLogin() {
    let userService = await this.authService.getUserByLogin(this.loginParam);
    if (userService) {
      for (let i = 0; i < Object.keys(userService).length; i++) {
        if (Object.keys(userService)[i] == 'id') {
          this.idUser = Object.values(userService)[i];
        }
      }
    }
  }
}
