import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Signalement} from "../models/Signalement";
import {UserSubscribe} from "../models/UserSubscribe";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private urlAdminIsLogin = `${environment.apiUrl}/admin`;
  private urlSignalement = `${environment.apiUrl}/admin/signalements`;
  private urlGetUSerById = `${environment.apiUrl}/admin/users`;

  constructor(private http: HttpClient) {
  }

  isUserLogin(){
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.http.get<boolean>(this.urlAdminIsLogin + "/", header);
  }

  getSignalements(){
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    return this.http.get<Signalement[]>(this.urlSignalement, header);
  }

  getUserById(id: number){
    let token = localStorage.getItem("token");
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }
    console.log(this.urlGetUSerById + "/" + id);
    return this.http.get<UserSubscribe>(this.urlGetUSerById + "/" + id, header);
  }


}
