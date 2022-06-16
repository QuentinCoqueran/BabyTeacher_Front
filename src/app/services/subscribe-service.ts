import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ResponseUser} from "../models/ResponseUser";
import {UserSubscribe} from "../models/UserSubscribe";
import {UpdateBabysitter} from "../models/UpdateBabysitter";

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private urlSubscribe = `${environment.apiUrl}/auth/subscribe`;
  private urlUpdateBabysitter = `${environment.apiUrl}/auth/updateBabysitter`;

  constructor(private http: HttpClient) {
  }

  subscribeUser(user: UserSubscribe): Observable<ResponseUser> {
    return this.http.post<ResponseUser>(this.urlSubscribe, user);
  }

  updateBabysitter(updateBabysitter: UpdateBabysitter): Observable<boolean> {
    return this.http.post<boolean>(this.urlUpdateBabysitter, updateBabysitter);
  }

  initCategories(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/auth/initCategories`);
  }
}

