import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {AdminService} from "../services/admin.service";
import {Params, Router} from "@angular/router";
import {User} from "../models/User";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  public users: User[] = [];

  constructor(private adminService: AdminService, private router: Router) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };

    this.getUsers();
  }

  async initUserAdmin() {
    this.adminService.isUserLogin().subscribe(
      (data: any) => {
      }, (error: any) => {
        console.log("Vous n'êtes pas admin");
        this.router.navigate(['/home']);
      }
    );
  }

  async getUsers() {
    await this.initUserAdmin();
    await this.adminService.getUsers().subscribe(
      (data: any) => {
        console.log(data);
        this.users = data["response"];
      }, (error: any) => {

      }
    );
  }

  async goToProfile(login: string) {
    console.log("toto");
    const queryParams: Params = {login: login};
    await this.router.navigate(
      ['/profile'],
      {
        queryParams: queryParams,
      });
  }
}
