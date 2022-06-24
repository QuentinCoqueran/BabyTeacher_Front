import {Component, OnInit} from '@angular/core';
import {ConnexionService} from "../services/connexion.service";
import {UserSubscribe} from "../models/UserSubscribe";
import {SubscribeService} from "../services/subscribe-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userId: number;
  public roleId: number;
  public errorMessage: string = "";
  public returnError = false;
  public user: UserSubscribe = new UserSubscribe('', '', '', '', '', 0, 0, '');
  public sexeUser: string = "";
  public sexe = "1";
  public lengthTextAreaNumber: number = 0;
  public saveDisabled: boolean = false;
  public loginParam: string = "";
  public samePeople: boolean = false;
  public displaySkillsListBool: boolean = false;
  public displayAgendaBool: boolean = false;
  public displayInformationsBool: boolean = false;
  public modificationUserBool: boolean = false;
  public modificationSkillsBool: boolean = false;
  public listAllCategories: string[] = [];
  public listAllSkills: [{ skills: string, categorie: string }] = [{skills: '', categorie: ''}];
  public listAllSkillsUpdate: [{ skills: string, categorie: string, index: number }] = [{
    skills: '',
    categorie: '',
    index: 0
  }];
  Object = Object;
  pictureProfile: string = "../assets/avatar.png";
  private categorySelected: string;

  constructor(private authService: ConnexionService, private updateUserService: SubscribeService, private route: ActivatedRoute, private subscribeService: SubscribeService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      this.loginParam = params['login'];
      if (!this.loginParam) {
        await this.router.navigate(['/login']);
        return;
      }
      await this.initUserByLogin()
      await this.initUserByToken();
      this.initSkills();
    });
  }

  async initUserByToken() {
    let userService = await this.authService.isUserLoggedIn();
    if (userService) {
      for (let i = 0; i < Object.keys(userService).length; i++) {
        if (Object.keys(userService)[i] == 'login') {
          this.samePeople = this.loginParam == Object.values(userService)[i];
        }
      }
    } else {
      await this.router.navigate(['/login']);
      return;
    }
  }

  async initUserByLogin() {
    let userService = await this.authService.getUserByLogin(this.loginParam);
    if (userService) {
      for (let i = 0; i < Object.keys(userService).length; i++) {
        if (Object.keys(userService)[i] == "id") {
          this.userId = Object.values(userService)[i];
        }
        if (Object.keys(userService)[i] == 'login') {
          this.user.login = Object.values(userService)[i];
        }
        if (Object.keys(userService)[i] == 'lastname') {
          this.user.lastname = Object.values(userService)[i];
        }
        if (Object.keys(userService)[i] == 'name') {
          this.user.name = Object.values(userService)[i];
        }
        if (Object.keys(userService)[i] == 'email') {
          this.user.email = Object.values(userService)[i];
        }
        if (Object.keys(userService)[i] == 'photo') {
          if (Object.values(userService)[i] === null) {
            this.pictureProfile = "../assets/avatar.png";
          } else {
            this.pictureProfile = Object.values(userService)[i];
          }
        }
        if (Object.keys(userService)[i] == 'description') {
          this.user.description = Object.values(userService)[i];
          if (Object.values(userService)[i])
            this.lengthTextAreaNumber = Object.values(userService)[i].length;
        }
        if (Object.keys(userService)[i] == 'age') {
          this.user.age = Object.values(userService)[i];
        }
        if (Object.keys(userService)[i] == 'id_role') {
          this.roleId = Object.values(userService)[i];
        }
        if (Object.keys(userService)[i] == 'sexe') {
          this.sexe = Object.values(userService)[i].toString();
          if (Object.values(userService)[i] == 1) {
            this.sexeUser = 'Homme';
          } else {
            this.sexeUser = 'Femme';
          }
        }
      }
      await this.initRole();
    } else {
      await this.router.navigate(['/login']);
      return;
    }
  }

  async initRole() {
    let role = await this.authService.getRoleByToken(this.userId);
    if (role) {
      this.user.role = Object.values(role)[0]['role'];
    } else {
      this.user.role = "";
      this.errorMessage = "Veuillez vous reconnecter";
      this.returnError = true;
    }
  }

  closeAlert() {
    this.returnError = false;
  }

  modificationUser() {
    this.modificationUserBool = !this.modificationUserBool;
  }

  modificationSkills() {
    this.modificationSkillsBool = !this.modificationSkillsBool;
    this.initCategories();
  }

  modifySexe(value: string) {
    this.sexe = value;
  }

  onKeyUpTextArea(box: HTMLTextAreaElement) {
    this.lengthTextAreaNumber = box.value.length;
  }

  updateUser() {
    if (this.modificationUserBool) {
      this.user.sexe = parseInt(this.sexe);
      this.user.id = this.userId;
      if (this.user.sexe != 1 && this.user.sexe != 2) {
        this.errorMessage = "Erreur avec le sexe"
        this.returnError = true;
        return;
      }
      if (!this.user.age || this.user.login && !this.user.lastname || !this.user.name || !this.user.email || !this.user.sexe) {
        this.errorMessage = "Veuillez remplir tous les champs";
        this.returnError = true;
        return;
      }
      if (this.user.age < 16) {
        this.errorMessage = "Age minimum 16 ans"
        this.returnError = true;
        return;
      }
      if (this.user.age > 100) {
        this.errorMessage = "Age maximum 100 ans"
        this.returnError = true;
        return;
      }
      if (this.user.description && this.user.description.length > 100) {
        this.errorMessage = "Description trop longue"
        this.returnError = true;
        return;
      }
      this.saveDisabled = true;
      this.updateUserService.updateUser(this.user).subscribe(
        (data: any) => {
          if (data.response) {
            this.modificationUserBool = false;
            this.saveDisabled = false;
          } else {
            this.errorMessage = "Erreur lors de la modification";
            this.returnError = true;
          }
        });
    }
  }

  private initSkills() {
    this.listAllSkills = [{skills: '', categorie: ''}];
    this.authService.getSkills(this.user.login).then(
      (data: any) => {
        if (data.response) {
          for (let i = 0; i < data.response.length; i++) {
            if (this.listAllSkills[0].skills == '') {
              this.listAllSkills[0] = {skills: data.response[i]["name"], categorie: data.response[i]["test"]};
            } else {
              this.listAllSkills.push({skills: data.response[i]["name"], categorie: data.response[i]["test"]});
            }
          }
        } else {
          this.errorMessage = "Erreur lors de la récupération des compétences";
          this.returnError = true;
        }
      }
    );
  }

  displaySkillsList() {
    this.displaySkillsListBool = !this.displaySkillsListBool;
    this.displayAgendaBool = false;
    this.displayInformationsBool = false;
  }

  displayAgenda() {
    this.displayAgendaBool = !this.displayAgendaBool;
    this.displaySkillsListBool = false;
    this.displayInformationsBool = false;
  }

  displayInformations() {
    this.displayInformationsBool = !this.displayInformationsBool;
    this.displaySkillsListBool = false;
    this.displayAgendaBool = false;
  }

  updateSkills() {
    if (this.modificationSkillsBool) {
      for (let i = 0; i < this.listAllSkillsUpdate.length; i++) {
        if (this.listAllSkillsUpdate[i].skills != '') {
          this.listAllSkills[this.listAllSkillsUpdate[i].index].skills = this.listAllSkillsUpdate[i].skills;
        }
        if (this.listAllSkillsUpdate[i].categorie != '') {
          this.listAllSkills[this.listAllSkillsUpdate[i].index].categorie = this.listAllSkillsUpdate[i].categorie;
        }
      }
    }
    this.modificationSkillsBool = !this.modificationSkillsBool;
    console.log(this.listAllSkills);
  }


  private initCategories() {
    this.listAllCategories = [];
    this.subscribeService.initCategories().subscribe(
      (data: any) => {
        for (let elem of data.response) {
          this.listAllCategories.push(elem.name);
        }
      }, (error: any) => {
        this.returnError = true;
        this.errorMessage = "Une erreur est survenue " + error;
      });
  }

  onChangeCategorie($event: any, index: number) {
    if ($event.target.value == '') {
      return;
    }
    let categorie = $event.target.value;
    if (this.listAllSkillsUpdate[0].skills == "") {
      this.listAllSkillsUpdate[0].categorie = categorie;
      this.listAllSkillsUpdate[0].index = index;
    } else {
      for (let i = 0; i < this.listAllSkillsUpdate.length; i++) {
        if (this.listAllSkillsUpdate[i].index == index) {
          this.listAllSkillsUpdate[i].categorie = categorie;
          this.listAllSkillsUpdate[i].index = index;
          return;
        }
      }
      this.listAllSkillsUpdate.push({skills: '', categorie: categorie, index: index});
    }
  }

  onChangeSkill($event: any, index: number) {
    if ($event.target.value == '') {
      return;
    }
    let skill = $event.target.value;
    if (this.listAllSkillsUpdate[0].skills == "") {
      this.listAllSkillsUpdate[0].skills = skill;
      this.listAllSkillsUpdate[0].index = index;
    } else {
      for (let i = 0; i < this.listAllSkillsUpdate.length; i++) {
        if (this.listAllSkillsUpdate[i].index == index) {
          this.listAllSkillsUpdate[i].skills = skill;
          this.listAllSkillsUpdate[i].index = index;
          return;
        }
      }
      this.listAllSkillsUpdate.push({skills: skill, categorie: '', index: index});
    }
  }
}
