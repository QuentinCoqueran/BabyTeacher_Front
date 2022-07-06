import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConnexionService} from "../services/connexion.service";
import {UserSubscribe} from "../models/UserSubscribe";
import {Contract} from "../models/Contract";
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  public loading: boolean = false;
  public loginParam: string = "";
  public userIdByLogin: number;
  public user: UserSubscribe = new UserSubscribe('', '', '', '', '', 0, 0, '');
  public contrat: Contract = new Contract(-1, -1, -1, "", -1, -1,
    "", -1, -1, null, null, 0);
  public pictureProfile: string = "../assets/avatar.png";
  public errorMessage: string = "";
  public returnError = false;
  public userIdByToken: number;
  private roleToken: string;
  public displayContractBool: boolean = false;
  public displayHistoryBool: boolean = false;
  public displayHours: boolean = false;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(private route: ActivatedRoute, private authService: ConnexionService, private router: Router, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
  }

  ngOnInit(): void {
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    this.route.queryParams.subscribe(async params => {
      this.loading = true;
      if (params['login']) {
        this.loginParam = params['login'];
        await this.initUserByLogin();
      }
      await this.initUserByToken();
      this.loading = false;
    });
  }

  private async initUserByLogin() {
    let userService = await this.authService.getUserByLogin(this.loginParam);
    if (userService) {
      for (let i = 0; i < Object.keys(userService).length; i++) {
        console.log(Object.keys(userService)[i]);
        if (Object.keys(userService)[i] == "id") {
          this.userIdByLogin = Object.values(userService)[i];
          this.user.id = this.userIdByLogin;
        }
        if (Object.keys(userService)[i] == 'login') {
          this.user.login = Object.values(userService)[i];
        }
        if (Object.keys(userService)[i] == 'name') {
          this.user.name = Object.values(userService)[i];
        }
        if (Object.keys(userService)[i] == 'lastname') {
          this.user.lastname = Object.values(userService)[i];
        }
        if (Object.keys(userService)[i] == 'age') {
          this.user.age = Object.values(userService)[i];
        }
        if (Object.keys(userService)[i] == 'photo') {
          if (Object.values(userService)[i] === null) {
            this.pictureProfile = "../assets/avatar.png";
          } else {
            this.pictureProfile = Object.values(userService)[i];
          }
        }
      }
      this.user.role = await this.initRole(this.userIdByLogin);
    } else {
      await this.router.navigate(['/login']);
      return;
    }
  }

  private async initUserByToken() {
    let userService = await this.authService.isUserLoggedIn();
    if (userService) {
      for (let i = 0; i < Object.keys(userService).length; i++) {
        if (Object.keys(userService)[i] == 'id') {
          this.userIdByToken = Object.values(userService)[i];
        }
      }
    } else {
      await this.router.navigate(['/login']);
      return;
    }
    this.roleToken = await this.initRole(this.userIdByToken);
  }

  private async initRole(idUser: number) {
    let role = await this.authService.getRoleByToken(idUser);
    if (role) {
      return Object.values(role)[0]['role'];
    } else {
      this.user.role = "";
      this.errorMessage = "Veuillez vous reconnecter";
      this.returnError = true;
    }
  }

  closeAlert() {
    this.returnError = false;
  }

  displayContract() {
    this.displayContractBool = !this.displayContractBool;
    this.displayHistoryBool = false;
    this.displayHours = false;
  }

  displayHistory() {
    this.displayHistoryBool = !this.displayHistoryBool;
    this.displayContractBool = false;
  }

  saveBabysitter() {
    if (this.userIdByLogin) {
      this.contrat.idBabysitter = this.userIdByLogin;
      this.contrat.idParent = this.userIdByToken;
      this.displayHours = true;
    } else {
      this.errorMessage = "Erreur avec les champs";
      this.returnError = true;
    }
  }

  saveHours(hourlyWage: string, startDate: string, endDate: string, hoursTotal: string) {
    if (hourlyWage && parseInt(hourlyWage) > 0 && startDate && endDate && hoursTotal && parseInt(hoursTotal) > 0 && this.fromDate && this.toDate) {
      const startDateFormate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
      const endDateFormate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
      if (parseInt(startDate) < parseInt(endDate)) {
        this.contrat.hourlyWage = parseInt(hourlyWage);
        this.contrat.startDate = startDateFormate;
        this.contrat.endDate = endDateFormate;
        this.contrat.numberOfHours = parseInt(hoursTotal);
        this.contrat.step = 0;
      }
    } else {
      this.errorMessage = "Veuillez remplir tous les champs";
      this.returnError = true;
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
      date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
      this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
