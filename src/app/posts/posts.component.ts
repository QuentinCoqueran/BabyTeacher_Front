import {Component, OnInit} from '@angular/core';
import {ConnexionService} from "../services/connexion.service";
import {SubscribeService} from "../services/subscribe-service";
import {ActivatedRoute, Router} from "@angular/router";
import {AvailabilityService} from "../services/availability.service";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";


import codesPostaux from "codes-postaux";
import {PostsService} from "../services/posts.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public displayCreatePostsBool = false;
  public displaySearchPostsBool = false;
  public loading: boolean = false;
  public idUser: number;
  public userRole: string;
  public listCommuneSelect: string[] = [];
  public errorMessage: string = "";
  public returnError = false;

  public nextStepCreatePostsBool: boolean = false;
  private postsSave: { codeDep: string[]; cityCode: number | null; hourlyWage: any; description: string; numberChild: number | null; availability: null | string[][]; ageChild: null };
  private availabilityTest: string[][];

  constructor(private authService: ConnexionService, private updateUserService: SubscribeService, private route: ActivatedRoute, private subscribeService: SubscribeService, private router: Router, private postsService: PostsService) {
  }

  async ngOnInit() {
    this.loading = true;
    await this.initUserByToken();
    this.loading = false;
  }

  displayCreatePosts() {
    this.displayCreatePostsBool = !this.displayCreatePostsBool;
  }

  displaySearchPosts() {
    this.displaySearchPostsBool = !this.displaySearchPostsBool;
  }

  savePost(city: string, hourlyWage: string, description: string, numberChild: string) {
    let numberChildInt;
    let cityInt;
    let hourlyWageInt;
    if (hourlyWage == "") {
      this.errorMessage = "Vous devez entrer un salaire horaire";
      this.returnError = true;
      return;
    } else {
      hourlyWageInt = parseInt(hourlyWage);
    }
    if (description == "") {
      this.errorMessage = "Vous devez entrer une description";
      this.returnError = true;
      return;
    }
    if (numberChild == "") {
      numberChildInt = null
    } else {
      if (parseInt(numberChild) > 10 || parseInt(numberChild) < 0) {
        this.errorMessage = "Vous devez entrer un nombre d'enfants entre 0 et 10";
        this.returnError = true;
        return;
      }
      numberChildInt = parseInt(numberChild)
    }
    if (city == "") {
      cityInt = null
    } else {
      if (codesPostaux.find(city).length == 0) {
        this.errorMessage = "Vous devez entrer un code postal valide";
        this.returnError = true;
        return;
      }
      cityInt = parseInt(city)
    }
    this.postsSave = {
      cityCode: cityInt,
      codeDep: this.listCommuneSelect,
      hourlyWage: hourlyWageInt,
      description: description,
      numberChild: numberChildInt,
      availability: null,
      ageChild: null
    };
    if (this.userRole == 'parent') {
      this.nextStepCreatePostsBool = true;
    } else {
      this.createPosts();
    }
  }

  private async initUserByToken() {
    let userService = await this.authService.isUserLoggedIn();
    if (userService) {
      for (let i = 0; i < Object.keys(userService).length; i++) {
        if (Object.keys(userService)[i] == 'id') {
          this.idUser = Object.values(userService)[i];
        }
      }
    } else {
      await this.router.navigate(['/login']);
      return;
    }
    await this.initRole();
  }

  async initRole() {
    let role = await this.authService.getRoleByToken(this.idUser);
    if (role) {
      this.userRole = Object.values(role)[0]['role'];
    } else {
      await this.router.navigate(['/login']);
      return;
    }
  }

  onChangeSelect($event: any) {
    if (this.listCommuneSelect.length > 5) {
      this.errorMessage = "Vous ne pouvez sélectionner que 5 communes maximum";
      this.returnError = true;
      return;
    }
    if (!this.listCommuneSelect.includes($event.target.value)) {
      this.listCommuneSelect.push($event.target.value);
    }
  }

  closeAlert() {
    this.errorMessage = "";
    this.returnError = false;
  }

  public createPosts() {
    this.postsService.createPosts(this.postsSave).subscribe(
      (data) => {
        this.nextStepCreatePostsBool = false;
        this.displayCreatePostsBool = false;
        this.displaySearchPostsBool = false;
        this.listCommuneSelect = [];
      }
    );
  }

  addItem($event: string[][]) {
    this.postsSave.availability = $event;
  }

}
