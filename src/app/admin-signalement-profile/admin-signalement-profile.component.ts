import { Component, OnInit } from '@angular/core';
import {Signalement} from "../models/Signalement";
import {AdminService} from "../services/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserSubscribe} from "../models/UserSubscribe";

@Component({
  selector: 'app-admin-signalement-profile',
  templateUrl: './admin-signalement-profile.component.html',
  styleUrls: ['./admin-signalement-profile.component.scss']
})
export class AdminSignalementProfileComponent implements OnInit {

  public haveSignalements: boolean = false;
  public signalements: Signalement[] = [];
  public idProfile: number;
  public userProfile: UserSubscribe;
  public usersInfo: UserSubscribe[] = [];
  public isLoaded: boolean = false;

  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(){
    await this.initUserAdmin();
    this.route.queryParams.subscribe(async params => {
      this.idProfile = params['id'];
    });

    await this.getUserProfile(this.idProfile)
    await this.getSignalementByProfile(this.idProfile)
  }

  async initUserAdmin(): Promise<void> {
    await this.adminService.isUserLogin().subscribe(
      (data: any) => {
      }, (error: any) => {
        console.log("Vous n'êtes pas admin");
        this.router.navigate(['/home']);
      }
    );
  }

  async getSignalementByProfile(idProfile: number): Promise<void> {
    await this.adminService.getSignalementByIdProfile(idProfile).subscribe({
      next: async (data: Signalement[]) => {
        this.signalements = data["response"];
        this.haveSignalements = true;

        for (let signalement of this.signalements) {
          await this.adminService.getUserById(signalement.idSignaler).subscribe({
            next: (data: UserSubscribe) => {
              this.usersInfo[signalement.idSignaler] = data["user"];
            }, error: (error: any) => {
              console.log("Pas de profil: " + error);
            }
          });
        }
      },error: (error: any) => {
        console.log("Pas de signalement: " + error);
      }
    });

  }

  async getUserProfile(idProfile: number): Promise<void> {
    this.adminService.getUserById(idProfile).subscribe({
      next: (data: UserSubscribe) => {
        this.userProfile = data["user"];
      },error: (error: any) => {
        console.log("Pas de profil: " + error);
      }
    });
  }

  goToSpecificProfile(id: number){
    console.log(id);
    this.router.navigate(['/profile'], {queryParams: {login: id}});
  }

}
