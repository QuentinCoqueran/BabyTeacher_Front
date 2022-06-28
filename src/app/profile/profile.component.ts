import {Component, OnInit} from '@angular/core';
import {ConnexionService} from "../services/connexion.service";
import {UserSubscribe} from "../models/UserSubscribe";
import {SubscribeService} from "../services/subscribe-service";
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateBabysitter} from "../models/UpdateBabysitter";

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
  public addSkillBool: boolean = false;
  public listAllCategories: string[] = [];
  public listAllSkills: [{ category: string, id: number, skill: string }] = [{skill: '', id: -1, category: ''}];
  public listAllSkillsTmp: [{ category: string, id: number, skill: string }] = [{skill: '', id: -1, category: ''}];
  updateBabysitter: UpdateBabysitter = new UpdateBabysitter();
  public listAllSkillsUpdate: [{ skill: string, id: number, category: string, index: number }] = [{
    skill: '',
    id: -1,
    category: '',
    index: 0
  }];
  Object = Object;
  pictureProfile: string = "../assets/avatar.png";
  private categorySelected: string;
  loading: boolean = false;

  constructor(private authService: ConnexionService, private updateUserService: SubscribeService, private route: ActivatedRoute, private subscribeService: SubscribeService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      this.loading = true;
      this.loginParam = params['login'];
      if (!this.loginParam) {
        await this.router.navigate(['/login']);
        return;
      }
      await this.initUserByLogin();
      await this.initUserByToken();
      this.initSkills();
      this.loading = false;
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
    this.listAllSkills = [{skill: '', id: -1, category: ''}];
    this.authService.getSkills(this.user.login).then(
      (data: any) => {
        if (data.response) {
          for (let i = 0; i < data.response.length; i++) {
            if (this.listAllSkills[0].skill == '') {
              this.listAllSkills[0] = {
                skill: data.response[i]["name"],
                id: data.response[i]["id"],
                category: data.response[i]["test"]
              };
            } else {
              this.listAllSkills.push({
                skill: data.response[i]["name"],
                id: data.response[i]["id"],
                category: data.response[i]["test"]
              });
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

  insertSkills() {
    if (this.addSkillBool) {
      if (this.listAllSkills.length >= 5) {
        this.errorMessage = "Vous avez atteint le nombre maximum de compétences";
        this.returnError = true;
        return;
      } else if (this.listAllSkillsUpdate[0].skill.length > 20) {
        this.errorMessage = "Nom de compétence trop long max 20 caractères";
        this.returnError = true;
        return;
      } else if (this.listAllSkillsUpdate[0].skill.length == 0) {
        this.errorMessage = "Veuillez entrer un nom de compétence";
        this.returnError = true;
        return;
      } else if (this.listAllSkillsUpdate[0].category.length == 0) {
        this.errorMessage = "Veuillez entrer une catégorie";
        this.returnError = true;
        return;
      }
      this.listAllSkillsTmp = this.listAllSkillsUpdate;
      this.listAllSkills.push(this.listAllSkillsTmp[0])
      this.modificationSkillsBool = false;
      this.addSkillBool = false;
      this.listAllSkillsUpdate = [{skill: '', id: -1, category: '', index: 0}];
      this.updateBabysitter.id = this.userId;
      this.updateBabysitter.arraySkill = this.listAllSkillsTmp;
      this.subscribeService.insertBabysitter(this.updateBabysitter).subscribe(
        (data: any) => {
          //navigate to the next page
          if (data.response) {
            this.modificationSkillsBool = false;
            this.addSkillBool = false;
          } else {
            this.returnError = true;
            this.errorMessage = data.message;
          }
        }, (error: any) => {
          this.returnError = true;
          this.errorMessage = "Une erreur est survenue " + error;
        });
    }
  }

  updateSkills() {
    if (this.modificationSkillsBool) {
      for (let i = 0; i < this.listAllSkillsUpdate.length; i++) {
        if (this.listAllSkillsUpdate[i].skill != '') {
          this.listAllSkills[this.listAllSkillsUpdate[i].index].skill = this.listAllSkillsUpdate[i].skill;
          this.listAllSkills[this.listAllSkillsUpdate[i].index].id = this.listAllSkillsUpdate[i].id;
        }
        if (this.listAllSkillsUpdate[i].category != '') {
          this.listAllSkills[this.listAllSkillsUpdate[i].index].category = this.listAllSkillsUpdate[i].category;
          this.listAllSkills[this.listAllSkillsUpdate[i].index].id = this.listAllSkillsUpdate[i].id;
        }
      }
      for (let i = 0; i < this.listAllSkills.length; i++) {
        if (this.countInArray(this.listAllSkills, this.listAllSkills[i].skill) > 1) {
          this.errorMessage = "Vous avez déjà une compétence portant ce nom";
          this.returnError = true;
          return;
        }
      }
      this.modificationSkillsBool = false;
      this.addSkillBool = false;
      this.listAllSkillsUpdate = [{skill: '', id: -1, category: '', index: 0}];
      this.updateBabysitter.id = this.userId;
      this.updateBabysitter.arraySkill = this.listAllSkills;

      this.subscribeService.updateSkillsBabysitter(this.updateBabysitter).subscribe(
        (data: any) => {
          //navigate to the next page
          if (data.response) {
            this.modificationSkillsBool = false;
            this.addSkillBool = false;
          } else {
            this.returnError = true;
            this.errorMessage = data.message;
          }
        }, (error: any) => {
          this.returnError = true;
          this.errorMessage = "Une erreur est survenue " + error;
        });
    }
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

  onChangeCategorie($event: any, index: number, id: number) {
    if ($event.target.value == '') {
      return;
    }
    let categorie = $event.target.value;
    if (this.modificationSkillsBool && index != -1) {
      if (this.listAllSkillsUpdate[0].skill == "" && this.listAllSkillsUpdate[0].category == "") {
        this.listAllSkillsUpdate[0].category = categorie;
        this.listAllSkillsUpdate[0].index = index;
        this.listAllSkillsUpdate[0].id = id;
      } else {
        for (let i = 0; i < this.listAllSkillsUpdate.length; i++) {
          if (this.listAllSkillsUpdate[i].index == index) {
            this.listAllSkillsUpdate[i].category = categorie;
            this.listAllSkillsUpdate[i].id = id;
            this.listAllSkillsUpdate[i].index = index;
            return;
          }
        }
        this.listAllSkillsUpdate.push({skill: '', id: id, category: categorie, index: index});
      }
    }

    if (this.addSkillBool && index == -1) {
      if (this.listAllSkillsUpdate[0].skill == "") {
        this.listAllSkillsUpdate[0].category = categorie;
        this.listAllSkillsUpdate[0].id = id;
        this.listAllSkillsUpdate[0].index = index;
      } else {
        for (let i = 0; i < this.listAllSkillsUpdate.length; i++) {
          if (this.listAllSkillsUpdate[i].index == index) {
            this.listAllSkillsUpdate[i].category = categorie;
            this.listAllSkillsUpdate[i].id = id;
            this.listAllSkillsUpdate[i].index = -1;
            return;
          }
        }
        this.listAllSkillsUpdate.push({skill: '', id: id, category: categorie, index: -1});
      }
    }
  }

  onChangeSkill($event: any, index: number, id: number) {
    if ($event.target.value == '') {
      return;
    }
    let skill = $event.target.value;
    if (this.modificationSkillsBool && index != -1) {
      if (this.listAllSkillsUpdate[0].skill == "") {
        this.listAllSkillsUpdate[0].skill = skill;
        this.listAllSkillsUpdate[0].id = id;
        this.listAllSkillsUpdate[0].index = index;
      } else {
        for (let i = 0; i < this.listAllSkillsUpdate.length; i++) {
          if (this.listAllSkillsUpdate[i].index == index) {
            this.listAllSkillsUpdate[i].skill = skill;
            this.listAllSkillsUpdate[0].id = id;
            this.listAllSkillsUpdate[i].index = index;
            return;
          }
        }
        this.listAllSkillsUpdate.push({skill: skill, id: id, category: '', index: index});
      }
    }
    if (this.addSkillBool && index == -1) {
      if (this.listAllSkillsUpdate[0].skill == "") {
        this.listAllSkillsUpdate[0].skill = skill;
        this.listAllSkillsUpdate[0].id = id;
        this.listAllSkillsUpdate[0].index = index;
      } else {
        for (let i = 0; i < this.listAllSkillsUpdate.length; i++) {
          if (this.listAllSkillsUpdate[i].index == index) {
            this.listAllSkillsUpdate[i].skill = skill;
            this.listAllSkillsUpdate[0].id = id;
            this.listAllSkillsUpdate[i].index = -1;
            return;
          }
        }
        this.listAllSkillsUpdate.push({skill: skill, id: id, category: '', index: -1});
      }
    }
  }

  countInArray(array: any, what: string) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i].skill === what) {
        count++;
      }
    }
    return count;
  }

  async addSkill() {
    this.addSkillBool = !this.addSkillBool;
    this.initCategories();
  }

  cancel() {
    this.modificationSkillsBool = false;
    this.modificationUserBool = false;
    this.addSkillBool = false;
    this.listAllSkillsUpdate = [{skill: '', id: -1, category: '', index: 0}];
  }

  deleteSkill(index: number, id: number) {
    //supprimer la skill de la liste
    this.listAllSkills.splice(index, 1);
    //supprimer la skill de la liste update
    for (let i = 0; i < this.listAllSkillsUpdate.length; i++) {
      if (this.listAllSkillsUpdate[i].id == id) {
        this.listAllSkillsUpdate.splice(i, 1);
        return;
      }
    }
    //suprimer le skill dans la base de données
    this.subscribeService.deleteSkill(id).subscribe(
      (data: any) => {
      }, (error: any) => {
        this.returnError = true;
        this.errorMessage = "Une erreur est survenue " + error;
      });
  }

}
