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
  public allSignalements: Signalement[] = [];
  public idProfile: number;
  public userProfile: UserSubscribe;

  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      this.idProfile = params['id'];
    });

    this.getUserProfile(this.idProfile).then(r => {});
    this.getSignalementByProfile(this.idProfile).then(r => {});
  }

  async getSignalementByProfile(idProfile: number){
    console.log(idProfile);
    this.adminService.getSignalementByIdProfile(idProfile).subscribe({
      next: (data: Signalement[]) => {
        this.allSignalements = data;
        this.haveSignalements = true;
        console.log(this.allSignalements);
      },error: (error: any) => {
        console.log("Pas de signalement: " + error);
      }
    });
  }

  async getUserProfile(idProfile: number){
    this.adminService.getUserById(idProfile).subscribe({
      next: (data: UserSubscribe) => {
        this.userProfile = data["user"];
        console.log(this.userProfile.photo);
      },error: (error: any) => {
        console.log("Pas de profil: " + error);
      }
    });
  }

}
