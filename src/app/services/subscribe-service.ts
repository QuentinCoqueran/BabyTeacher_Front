import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {UserConnect} from 'src/app/models/UserConnect';
import {ResponseUser} from "../models/ResponseUser";
import {UserSubscribe} from "../models/UserSubscribe";

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private urlSubscribe = `${environment.apiUrl}/auth/subscribe`;

  constructor(private http: HttpClient) {
  }

  subscribeUser(user: UserSubscribe): Observable<ResponseUser> {
    return this.http.post<ResponseUser>(this.urlSubscribe, user);
  }

}

